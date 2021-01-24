from .views import SearchView, ProgressView
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
  path('', csrf_exempt(SearchView.as_view()), name="search"),
  path('progress/', csrf_exempt(ProgressView.as_view()), name="progress")
]