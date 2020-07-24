from django.contrib.auth.models import User
from api import models
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'password', 'is_superuser')

    def create(self, validated_data):
        # Use email as username as well
        email = validated_data.get('username')
        user, _ = User.objects.get_or_create(
            username=email,
            email=email,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError("The password cannot be ampty.")
        if len(value) < 8:
            raise serializers.ValidationError("The password must have at least 8 characters.")
        return value


class MemorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.Memory
        fields = '__all__'
        read_only_fields = ('user', )

    def create(self, validated_data):
        user = self.context.get('request').user
        validated_data['user'] = user
        return super(MemorySerializer, self).create(validated_data)

    def validate_rating(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError("Please enter a valid rating.")
        return value

    def validate_latitude(self, value):
        if value < -90 or value > 90:
            raise serializers.ValidationError("Please enter a valid latitude.")
        return value

    def validate_longitude(self, value):
        if value < -180 or value > 180:
            raise serializers.ValidationError("Please enter a valid longitude.")
        return value