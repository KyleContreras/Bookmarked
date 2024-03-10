from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.book_reviews import BookReviewViewSet
from .views.bookcase import BookcaseViewSet, BooksInBookcaseViewSet
from .views.books import BookViewSet
from .views.user import create_account, user_login, user_logout
from .views.user_profile import UserProfileViewSet

router = DefaultRouter()
router.register(r'api/books', BookViewSet)
router.register(r'api/reviews', BookReviewViewSet)
router.register(r'api/userprofile', UserProfileViewSet)
router.register(r'api/bookcase', BookcaseViewSet)
router.register(r'api/booksinbookcase', BooksInBookcaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/user/register/', create_account, name='create_account'),
    path('api/user/login/', user_login, name='user_login'),
    path('api/user/logout/', user_logout, name='user_logout'),
]
