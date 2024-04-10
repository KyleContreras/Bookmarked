from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.book_reviews import BookReviewViewSet, my_book_review
from .views.bookcase import BookcaseViewSet, BooksInBookcaseViewSet, my_bookcase, delete_book_from_bookcase, \
    get_user_bookcase
from .views.books import BookViewSet
from .views.user import create_account, user_login, user_logout
from .views.user_profile import UserProfileViewSet, my_profile

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
    path('api/bookcase/my_bookcase', my_bookcase, name='get_my_bookcase'),
    path('api/userprofile/my_profile', my_profile, name="get_my_profile"),
    path('api/bookcasebyuserid/<int:user_id>', get_user_bookcase, name='user_bookcase_by_id'),
    path('api/booksinbookcase/delete_book_from_bookcase', delete_book_from_bookcase, name='delete_book_from_bookcase'),
    path('api/reviews/my_book_review', my_book_review, name='my_book_review')
]
