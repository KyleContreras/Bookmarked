from rest_framework import viewsets, authentication, permissions, filters, status
from rest_framework.exceptions import PermissionDenied

from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from app.models.user_profile import UserProfile
from app.serializers.user_profile import UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    # Regulate access to HTTP methods
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    # Check to see if the user can operate on this object
    def check_object_permissions(self, request, obj):
        if request.method not in permissions.SAFE_METHODS and obj.user != request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        super().check_object_permissions(request, obj)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_profile(request):
    profile = UserProfile.objects.filter(user=request.user.id)

    if profile is None:
        return Response({}, status=status.HTTP_404_NOT_FOUND)
    else:
        serialized_data = UserProfileSerializer(profile.first())
        serialized_profile = serialized_data.data
        return Response(serialized_profile, status=status.HTTP_200_OK)
