from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import User

class AddUserTest(TestCase):
    def setUp(self):
        User.objects.create(firstname='Andrew', lastname='Tran', username='atran', encrypted_password='pw123', email='atran@iastate.edu')
        User.objects.create(firstname='TestName', lastname='TestLast', username='TestUsername', encrypted_password='testpassword', email='test@iastate.edu')

    def testUserAdded(self):
        userAndrew = User.objects.get(username='atran')
        self.assertEqual(userAndrew.get_email(), 'atran@iastate.edu')
