from api.models import Topic

def run():
    # Fetch all questions
    topic = Topic.objects.all()
    # Delete questions
    topic.delete()
