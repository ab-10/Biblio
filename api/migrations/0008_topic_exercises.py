# Generated by Django 3.1.5 on 2021-01-24 14:58

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210124_1253'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='exercises',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True), default=[], size=None),
            preserve_default=False,
        ),
    ]
