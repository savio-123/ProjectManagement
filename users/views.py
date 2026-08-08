from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "role": user.role
        })


class UserListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response(
                {"message": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        employees = User.objects.filter(role="EMPLOYEE")
        serializer = UserSerializer(employees, many=True)

        return Response(serializer.data)

    def post(self, request):

        if request.user.role != "ADMIN":
            return Response(
                {"message": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        username = request.data.get("username")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role")

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"},status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            role=role
        )

        return Response({"message": "Employee created successfully"},status=status.HTTP_201_CREATED)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        return get_object_or_404(User,id=id,role="EMPLOYEE")
    
    def get(self, request, id):

        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)

        employee = self.get_object(id)
        serializer = UserSerializer(employee)
        return Response(serializer.data)

    def put(self, request, id):

        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        employee = self.get_object(id)

        employee.username = request.data.get("username",employee.username)
        employee.first_name = request.data.get("first_name",employee.first_name)
        employee.last_name = request.data.get("last_name",employee.last_name)
        employee.email = request.data.get("email",employee.email)
        employee.role = request.data.get("role",employee.role)
        password = request.data.get("password")

        if password:
            employee.set_password(password)

        employee.save()
        return Response({"message": "Employee updated successfully"})

    def delete(self, request, id):

        if request.user.role != "ADMIN":
            return Response(
                {"message": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        employee = self.get_object(id)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)