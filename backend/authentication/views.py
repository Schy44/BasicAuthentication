from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class LoginView(APIView):

    def post(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "message": "Login successful"
        })


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        print(request.user.username)
        content = {'message': 'Hello User!'}
        return Response(content)

class RegisterView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
       
        try:
            user = User.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            return Response(
                {"detail": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )   
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)    

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"] 
            token = RefreshToken(refresh_token) 
            token.blacklist()  
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:              
            return Response(status=status.HTTP_400_BAD_REQUEST ) 