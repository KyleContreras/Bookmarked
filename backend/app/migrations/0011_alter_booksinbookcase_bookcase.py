# Generated by Django 5.0.2 on 2024-03-10 06:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_rename_user_bookcase_booksinbookcase_bookcase'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booksinbookcase',
            name='bookcase',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='books', to='app.bookcase'),
        ),
    ]
