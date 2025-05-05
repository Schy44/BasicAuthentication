from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from . import views
urlpatterns = [
    path('token/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),

    path('', views.HomeView.as_view(), name='home'), 
    path('logout/', views.LogoutView.as_view(), name ='logout'),    
    path('register/', views.RegisterView.as_view(), name ='register'),
]