from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UsersSerializer


class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JWTAuthentication,)


class UserDetail(APIView):

    http_method_names = ['get']

    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, *args, **kwargs):
        user = self.request.user        
        serializer = UsersSerializer(user)
        return JsonResponse(serializer.data)


class UserNew(CreateAPIView):
    serializer_class = UsersSerializer

    def post(self, instance, *args, **kwargs):
        instance_copy = instance.data.copy()
        instance_copy.pop('password')
        user = self.serializer_class(data=instance_copy)
        if user.is_valid():
            user.save()
            set_password = CustomUser.objects.get(username=instance.data['username'])
            set_password.set_password(instance.data['password'])
            set_password.save()
        else:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(user.data, status=status.HTTP_201_CREATED)

