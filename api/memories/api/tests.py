from django.test import TestCase
from django.contrib.auth.models import User
from api import models
from rest_framework.test import APIClient

from rest_framework import status

TEST_USERNAME = 'sebastian'
TEST_PASSWORD = 'test12345...'

class UserTest(TestCase):
    """ Test for User model """

    def setUp(self):
        User.objects.create(
            first_name='Sebastian', last_name='Silva',
            password=TEST_PASSWORD,
            username=TEST_USERNAME
        )
      
    def test_user_cration(self):
        user = User.objects.get(username=TEST_USERNAME)
        self.assertEqual(user.first_name, 'Sebastian')


class MemoryTest(TestCase):
    """ Test for Memory model """

    def setUp(self):
        self.test_description = 'This is a test description'
        self.user = User.objects.create(
            first_name='Sebastian', last_name='Silva',
            password=TEST_PASSWORD,
            username=TEST_USERNAME
        )
        models.Memory.objects.create(
            description=self.test_description,
            rating=5, 
            latitude=1.0000,
            longitude=0.003,
            user=self.user
        )
    
    def test_memory_cration(self):
        memory = models.Memory.objects.get(user=self.user)
        self.assertEqual(memory.description, self.test_description)


class AuthTest(TestCase):
    """ Test Authentication """

    def setUp(self):
        self.username = TEST_USERNAME
        self.password = TEST_PASSWORD
        self.client = APIClient()

    def test_auth(self):
        self.user = User.objects.create(
            first_name='Sebastian', last_name='Silva',
            username=self.username
        )
        self.user.set_password(self.password)
        self.user.save()
        response = self.client.post('/api/token/', {'username': self.username, 'password': self.password}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
        token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        response = self.client.get('/api/user/', data={'format': 'json'})
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)


class MemoryAPITest(TestCase):
    """ Creation of memory for a user using API """

    def setUp(self):
        self.username = TEST_USERNAME
        self.password = TEST_PASSWORD
        self.test_description = 'This is a test description'
        self.client = APIClient()
        self.memory_data = {
            'description': self.test_description,
            'rating': 5, 
            'latitude': 1.0000,
            'longitude': 0.003,
        }

    
    def test_memory(self):
        self.user = User.objects.create(
            first_name='Sebastian', 
            last_name='Silva',
            username=self.username
        )
        self.user.set_password(self.password)
        self.user.save()
        self.client.login(username=self.username, password=self.password)
        response = self.client.post('/api/memory/', self.memory_data, format='json')
        self.assertEqual(response.data.get('user'), self.user.id)

