# Generated by Django 3.0.5 on 2020-04-30 16:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_auto_20200430_1639'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='facets_url',
        ),
    ]