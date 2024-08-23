from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BlogPost, User
from .serializers import BlogPostSerializer
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password


class BlogPostListCreate(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def delete(self, request, *args, **kwargs):
        BlogPost.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BlogPostRetrieveUpdateDestory(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = "pk"

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        User.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRetrieveUpdateDestory(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = ["username"]

class UserLoginView(APIView):
    
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')
        
        # Authenticate the user
        user = User.objects.get(username=username)

        print("note",user.password)
        
        if user is not None and user.password == password and user.role == role :
            # If the user is authenticated, log them in
            login(request, user)
            return Response({
                "message": "Login successful",
                "user": UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            # If authentication fails, return an error response
            return Response({
                "error": "Invalid username or password"
            }, status=status.HTTP_400_BAD_REQUEST)