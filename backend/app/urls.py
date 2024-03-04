from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.books_view import BookViewSet
from .views.user_view import create_account, user_login, user_logout, hello_world

router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/user/register/', create_account, name='create_account'),
    path('api/user/login/', user_login, name='user_login'),
    path('api/user/logout/', user_logout, name='user_logout'),
    path('api/hello_world/', hello_world, name='hello_world'),  #TODO: For testing
]
