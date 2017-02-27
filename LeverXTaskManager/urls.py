from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from application.views import BasicView


urlpatterns = [
    url(r'^$', BasicView.as_view(template_name='index.html'), name='main'),
    url(r'^api/', include("application.urls.api", namespace='api')),
    url(r'^admin/', admin.site.urls),
]
urlpatterns += staticfiles_urlpatterns()