from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from api import models
from api import serializers
# from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        # Admin can see all users but user can only see itself
        user = self.request.user
        if user.is_superuser:
            return super(UserViewset, self).get_queryset()
        return models.User.objects.filter(id=user.id)


class MemoryViewset(viewsets.ModelViewSet):
    queryset = models.Memory.objects.all()
    serializer_class = serializers.MemorySerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):

        # Admin can see all memories but user can only see its memories
        user = self.request.user
        if user.is_superuser:
            return super(MemoryViewset, self).get_queryset()
        return models.Memory.objects.filter(user=user)
