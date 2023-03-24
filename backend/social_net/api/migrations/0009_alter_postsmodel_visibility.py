# Generated by Django 4.1.7 on 2023-03-24 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_alter_postsmodel_visibility"),
    ]

    operations = [
        migrations.AlterField(
            model_name="postsmodel",
            name="visibility",
            field=models.CharField(
                choices=[
                    ("PUBLIC", "Public"),
                    ("PRIVATE", "Private"),
                    ("UNLISTED", "Unlisted"),
                ],
                default="PUBLIC",
                max_length=100,
            ),
        ),
    ]
