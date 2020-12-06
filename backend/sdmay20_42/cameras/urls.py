from django.urls import path
from . import views


urlpatterns = [
    path('camera/', views.add_camera),
    path('camera/<int:pk>/', views.camera_detail),
    path('cameras/<int:user_id>/', views.user_cameras),
]
