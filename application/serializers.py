from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from application.models import Task, Project, User
from datetime import datetime

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'name', 'id', 'is_manager', )


class CreateUserSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=110)
    password1 = serializers.CharField(max_length=25, write_only=True)
    password2 = serializers.CharField(max_length=25, write_only=True)
    position = serializers.CharField(max_length=15, write_only=True)
    name = serializers.CharField(max_length=50)

    def create_user(self, validated_data):
        pwd = validated_data.pop('password', None)
        user = User(**validated_data)
        user.set_password(pwd)
        user.save()
        return user

    def validate(self, attrs):
        attrs['password'] = attrs.pop('password1', None)
        attrs['email'] = attrs['email'].lower()
        if attrs['password'] != attrs.pop('password2', None):
            msg = "The two password fields didn't match."
            raise exceptions.ValidationError({'password1': msg, 'password2': msg})
        if attrs.pop('position') == 'manager':
            attrs['is_manager'] = True
        super(CreateUserSerializer, self).validate(attrs)
        return attrs

    class Meta:
        model = User
        fields = ('email', 'name', 'position', 'is_manager'
                  'password1', 'password2', 'token')


class AuthSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=110)
    password = serializers.CharField(max_length=25)

    def validate(self, attrs):
        user = User.objects.filter(email__iexact=attrs.get('email')).first()
        if user is None:
            msg = 'User with that username doesent exists'
            raise exceptions.ValidationError(msg)
        user = authenticate(username=user.email, password=attrs.get('password'))
        if user is None:
            msg = 'The password is wrong, please try again'
            raise exceptions.ValidationError(msg)
        attrs['user'] = user
        return attrs