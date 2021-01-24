from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Topic(models.Model):
    topic = models.CharField(max_length=30, null=True)
    explanation = models.TextField(null=True)
    full_text = models.TextField(null=True)
    exercises = ArrayField(models.TextField(blank=True))
    learnt = models.BooleanField(default=False)
    learning = models.BooleanField(default=False)
    queued = models.BooleanField(default=False)

