from rest_framework import viewsets, authentication, permissions
from rest_framework.exceptions import PermissionDenied
from app.models.user_profile import UserProfile
from app.serializers.user_profile import UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

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
