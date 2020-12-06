from django.urls import path, include
from . import views

urlpatterns = [
    path('notification/', views.add_notification),
    path('notification/<int:pk>/', views.notification_detail),
    path('notifications/<int:user_id>/', views.user_notifications),
    path('notification/email/', views.notification_email),
]
