# Generated by Django 4.2.15 on 2024-08-23 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_user_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(default=list, max_length=100),
            preserve_default=False,
        ),
    ]
