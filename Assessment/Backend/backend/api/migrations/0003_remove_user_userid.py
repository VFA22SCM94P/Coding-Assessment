# Generated by Django 4.2.15 on 2024-08-23 03:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_blogpost_authorid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='userid',
        ),
    ]
