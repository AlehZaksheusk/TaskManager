from django.views.generic import TemplateView

class BasicView(TemplateView):
    template_name = 'index.html'