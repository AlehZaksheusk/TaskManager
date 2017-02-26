from django.conf.urls import url, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from application.viewsets import TaskViewSet, \
    ProjectViewSet, SignInViewSet, UserViewSet, InitializeAppViewSet

router = routers.DefaultRouter()
router.register(r'signin', SignInViewSet)
router.register(r'users', UserViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^signin/$', csrf_exempt(SignInViewSet.as_view()), name='signin'),
    url(r'^get-app-data/$', csrf_exempt(InitializeAppViewSet.as_view()), name='get-app-data'),
]
