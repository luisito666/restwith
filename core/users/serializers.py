from rest_framework import serializers
from .models import CustomUser


class UsersSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_user_full_name')

    def get_user_full_name(self, obj):
        user = CustomUser.objects.get(username=obj)
        full_name = user.first_name + ' ' + user.last_name
        return full_name

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'full_name' )
        
    
