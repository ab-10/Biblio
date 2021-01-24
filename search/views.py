from django.shortcuts import render
from django.views import View
from api.models import Topic
from scripts.extract_chapters import run
import json
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

# Create your views here.
class SearchView(View):
  def get(self, request):
    topics = Topic.objects.all()
    context = {
      'topics': topics
    }

    return render(request, 'base.html', context)



  @method_decorator(ensure_csrf_cookie)
  def post(self, request):
    if request.method == "POST" and request.body == b'test':
        run()
        print("uploaded files")
        return JsonResponse({"success": True}, status=200)
    else:
        return JsonResponse({"success": False}, status=400)

  
class ProgressView(View):
  def get(self, request):
    learnt = 0
    queued = 0
    topics = Topic.objects.all()
    a = []
    for topic in topics:
      print(topic.topic)
      if topic.learnt == True:
        a += [topic]
        # print(topic.exercises)
    context = {
      "topics": a
    }

    # return JsonResponse({"learning": learning, "learnt": learnt, "queued": queued})
    return render(request, "index.html", context)

  def post(self, request):
    data = json.loads(request.body)
    kind = data["type"]
    id = data["id"]
    topic = Topic.objects.get(id=id)
    if kind=="tick":
      topic.learnt = True
      topic.learning = False
      topic.queued = False
      topic.save()
    elif kind=="cross":
      topic.learnt = False
      topic.learning = True
      topic.queued = False
      topic.save()
    elif kind=="pause":
      topic.learnt = False
      topic.learning = False
      topic.queued = True
      topic.save()
    return JsonResponse({"ok": "success"})