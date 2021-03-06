"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path
from . import views
from django.conf import settings
from rest_framework import permissions
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('upload/', views.ImageUpload.as_view(), name="image_upload"),
    path('feed/', views.Feed.as_view(), name='artwork-dashboard'),
    path('artwork/<int:pk>/', views.RetrieveArtwork.as_view(), name='artwork-dashboard'),
    path('artwork/<int:artwork_pk>/comment/', views.CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='artwork-comment'),
    path('artwork/<int:artwork_pk>/comment/<int:pk>/', views.CommentDestroyAPIView.as_view(), name='artwork-comment-delete'),
    path('artwork/<int:pk>/like/', views.LikeAPIView.as_view(), name='artwork-like'),
    path('notification/', views.NotificaitonAPIView.as_view(), name='notification'),
    path('notification/<int:pk>', views.ReadNotificationAPIView.as_view(), name='read-notification'),
    path('notification/badge/', views.NotificationBadgeAPIView.as_view(), name='notification-badge'),
    path('user/<int:pk>/follow/', views.FollowAPIView.as_view(), name='follow-unfollow'),
    path('user/<int:pk>/', views.ProfileAPI.as_view(), name='profile'),
    path('tags/', views.SearchTagsAPI.as_view(), name='tags'),
    
]

if settings.DEBUG:
    urlpatterns += [
        # YOUR PATTERNS
        path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
        # Optional UI:
        path('api/schema/swagger-ui/',
             SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
        path('api/schema/redoc/',
             SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    ]
