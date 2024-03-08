from rest_framework import viewsets
from rest_framework import authentication, permissions
from app.models.book_reviews import BookReview
from app.serializers.book_reviews import BookReviewSerializer


# TODO: only want an authenticated user to alter their own review
class BookReviewViewSet(viewsets.ModelViewSet):
    queryset = BookReview.objects.all()
    serializer_class = BookReviewSerializer

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # A helper function
    # TODO: elseif for other Methods - Can current user operate on the current working object
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()
