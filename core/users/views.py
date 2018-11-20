from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import UsersSerializer


class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JWTAuthentication,)


class UserDetail(APIView):

    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, args, **kwargs):
        user = self.request.user        
        serializer = UsersSerializer(user)
        return JsonResponse(serializer.data)

