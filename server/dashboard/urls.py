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

from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.ImageUpload.as_view(), name="image_upload"),
    path('feed/', views.Feed.as_view(), name='artwork-dashboard'),
    path('artwork/<int:pk>/', views.RetrieveArtwork.as_view(), name='artwork-dashboard'),
    path('artwork/<int:artwork_pk>/comment/', views.CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='artwork-comment'),
    path('artwork/<int:artwork_pk>/comment/<int:pk>/', views.CommentDestroyAPIView.as_view(), name='artwork-comment-delete'),
    path('artwork/<int:pk>/like', views.LikeAPIView.as_view(), name='artwork-like'),
    
]