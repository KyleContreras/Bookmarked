# Generated by Django 5.0.2 on 2024-03-10 05:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_booksinbookcase_bookcase'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booksinbookcase',
            name='bookcase',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.bookcase'),
        ),
    ]