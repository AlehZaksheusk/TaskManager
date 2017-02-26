from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import APIView
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from application.models import Task, Project, User
from application.auth import CsrfExemptSessionAuthentication
from application.serializers import TaskSerializer, ProjectSerializer, AuthSerializer, CreateUserSerializer, UserSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset =  Project.objects.all()
    serializer_class = ProjectSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset =  User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create_user(serializer.validated_data)
        return Response(self.serializer_class(user).data, status=status.HTTP_201_CREATED)


class SignInViewSet(APIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = AuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)


class InitializeAppViewSet(APIView):
    queryset = User.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user;
        projects = Project.objects.all()
        users = User.objects.all()
        tasks = Task.objects.all()
        responce_data = {
            'is_manager': request.user.is_manager,
            'user': UserSerializer(request.user).data
        }
        if user.is_manager:
            if projects.exists():
                responce_data['projects'] = ProjectSerializer(projects, many=True).data
            if tasks.exists():
                responce_data['tasks'] = TaskSerializer(tasks, many=True).data
            if users.exists():
                responce_data['users'] = UserSerializer(users, many=True).data
        else:
            if projects.exists():
                projects = projects.filter(user=user)
                responce_data['projects'] = ProjectSerializer(projects, many=True).data
            if tasks.exists():
                responce_data['tasks'] = TaskSerializer(tasks.filter(project__in=projects), many=True).data
            if users.exists():
                responce_data['users'] = UserSerializer(users, many=True).data
        return Response(responce_data, status=status.HTTP_200_OK)