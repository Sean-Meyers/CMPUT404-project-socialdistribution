from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import NodeModel


class NodeViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username='admin', password='123', email='admin@example.com')
        self.node = NodeModel.objects.create(
            node_url="https://sd7-api.herokuapp.com",
            node_name="Test Node",
            node_user=self.admin_user,
            t16_uname="team16",
            t16_pw="team16pass"
        )
        self.valid_payload = {
            'host': "https://sd7-api.herokuapp.com",
            'resource': "/api/authors/",
            'query': "?page=1&size=25&query="
        }

    def test_authentication(self):
        # Test unauthenticated request
        response = self.client.post(reverse('node-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Test authenticated request
        self.client.login(username='admin', password='123')
        response = self.client.post(reverse('node-list'), data=self.valid_payload)
        self.assertNotEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_permission(self):
        # Test non-admin user
        non_admin = User.objects.create_user(username='nonadmin', password='123')
        self.client.login(username='nonadmin', password='123')
        response = self.client.post(reverse('node-list'), data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Test admin user
        self.client.login(username='admin', password='123')
        response = self.client.post(reverse('node-list'), data=self.valid_payload)
        self.assertNotEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_node_view_post(self):
        self.client.login(username='admin', password='123')

        # Test valid payload
        response = self.client.post(reverse('node-list'), data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Test invalid host
        invalid_payload = self.valid_payload.copy()
        invalid_payload['host'] = "https://invalid-host.example.com"
        response = self.client.post(reverse('node-list'), data=invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Test invalid method
        invalid_payload = self.valid_payload.copy()
        invalid_payload['method'] = "DELETE"
        response = self.client.post(reverse('node-list'), data=invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
