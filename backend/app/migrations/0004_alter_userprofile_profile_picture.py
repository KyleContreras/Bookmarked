# Generated by Django 5.0.2 on 2024-03-09 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_bookreview_book_userprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=models.URLField(),
        ),
    ]
