# Generated by Django 4.2.6 on 2024-11-06 14:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_rename_prediction_date_heartdiseaseprediction_date_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="UserProfile",
        ),
    ]
