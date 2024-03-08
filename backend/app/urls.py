from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.book_reviews import BookReviewViewSet
from .views.books import BookViewSet
from .views.user import create_account, user_login, user_logout

router = DefaultRouter()
router.register(r'api/books', BookViewSet)
router.register(r'api/reviews', BookReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/user/register/', create_account, name='create_account'),
    path('api/user/login/', user_login, name='user_login'),
    path('api/user/logout/', user_logout, name='user_logout'),
]
