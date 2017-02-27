from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from application.models import User, Project, Task


class UserTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "email": "test@t2est.ru",
            "name": "ApiUser",
            "is_manager": 'false',
            "password1": '123',
            "password2": '123',
        }
        user = User(email="test@test.test", name="Test", is_manager=True)
        User.set_password(self, raw_password='123')
        user.save()
        self.client.login(username=user.email, password='123')
        project = Project.objects.create(name="TestProject")
        project.user.add(user)
        project.save()


    def test_creating(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, "test@test.test")
        self.assertEqual(user.is_manager, True)
        self.assertNotEquals(user.password, 123)

    def test_communications(self):
        user = User.objects.get(id=1)
        project = Project.objects.get(id=1)
        self.assertEqual(project.user.first(), user)

    def test_get_user_api(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user_api(self):
        response = self.client.delete('/api/users/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.filter(id=1).exists(), False)