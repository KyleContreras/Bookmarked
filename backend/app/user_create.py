from django.contrib.auth.models import User


# Using Django's built-in 'User' model. Don't need to handle migrations, models, or serializers
user = User.objects.create_user(username='username', email='email@example.com', password='password')

user.first_name = 'First'
user.last_name = 'Last'
user.save()
