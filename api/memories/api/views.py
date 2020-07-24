from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from django.contrib.auth.models import User
from api import models
from api import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from api.permissions import IsOwnerOrReadOnly
from api.utils import get_tokens_for_user
from rest_framework.response import Response



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

    def get_permissions(self):
        """
        Allows anyone to post, i.e create new users.
        Listing is only allowed for admins.
        Users can see their own profiles
        Editing is owner only permitted.
        """
        user_actions = ['retrieve', 'update', 'partial_update', 'destroy']
        if self.action == 'list':
            self.permission_classes = [IsAuthenticated, ]
        elif self.action in user_actions:
            self.permission_classes = [IsOwnerOrReadOnly,]
        elif self.action == 'create':
            self.permission_classes = [AllowAny,]
        return super(self.__class__, self).get_permissions()

    def create(self, request, *args, **kwargs):
        """
        Append token on user registration
        """
        context = {'request': request}
        serializer = serializers.UserSerializer(data=request.data, context=context)
        if serializer.is_valid():
            model_obj = serializer.save()
            token = get_tokens_for_user(model_obj)
            response = {'user': serializer.data, 'token': token}
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
