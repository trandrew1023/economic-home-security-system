from rest_framework import serializers
from .models import Camera


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = ('camera_id', 'user_id', 'device_type', 'ip', 'status')