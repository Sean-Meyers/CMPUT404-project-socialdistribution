# Generated by Django 4.1.7 on 2023-03-24 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_alter_commentsmodel_author_alter_likemodel_author"),
    ]

    operations = [
        migrations.AlterField(
            model_name="authormodel",
            name="id",
            field=models.URLField(default="", unique=True),
        ),
    ]
