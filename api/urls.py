from django.urls import path, include
from .views import TopicsViewSet
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'topics', views.TopicsViewSet)

urlpatterns = [
  path('', include(router.urls)),
]