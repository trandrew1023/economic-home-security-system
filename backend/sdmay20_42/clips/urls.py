from django.urls import path, include
from . import views


urlpatterns = [
    path('clips/', views.add_clip),
    path('clip/<int:pk>/', views.clip_detail),
    path('clips/<int:user_id>/', views.user_clips),
]
