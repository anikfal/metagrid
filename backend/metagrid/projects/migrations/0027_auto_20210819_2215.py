# Generated by Django 3.1.13 on 2021-08-19 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0026_project_project_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='project_url',
            field=models.CharField(help_text='The url associated with this project.', max_length=255, null=True, unique=True),
        ),
    ]
