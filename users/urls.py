from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("users/", UserListCreateView.as_view()),
    path("users/<int:id>/", UserDetailView.as_view()),
]