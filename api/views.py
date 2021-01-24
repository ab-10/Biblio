from django.shortcuts import render
from rest_framework import viewsets
from .models import Topic
from .serializers import TopicSerializer
# Create your views here.


class TopicsViewSet(viewsets.ModelViewSet):
  queryset = Topic.objects.all()
  serializer_class = TopicSerializer
