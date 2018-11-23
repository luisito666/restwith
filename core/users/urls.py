from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('users/', views.UserList.as_view(), name='users'),
    path('users/info/', views.UserDetail.as_view(), name='user'),
    path('users/new/', views.UserNew.as_view(), name='create'),
    path('users/verify/<username>', views.ValidUser.as_view(), name='verify'),
]
