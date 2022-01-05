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
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path
from . import views

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
)


urlpatterns = [
  url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
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