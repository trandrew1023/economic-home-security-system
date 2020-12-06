from rest_framework import serializers
from .models import Clip


class ClipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clip
        fields = ('clip_id', 'user_id', 'camera_id', 'clip_url', 'date_added')