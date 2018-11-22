from rest_framework import serializers
from .models import CustomUser


class UsersSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_user_full_name')

    def get_user_full_name(self, obj):
        try:
            user = CustomUser.objects.get(username=obj).get_full_name()
        except CustomUser.DoesNotExist:
            user = obj['username']
        return user

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'full_name')

