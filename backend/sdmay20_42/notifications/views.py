from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse

from .models import Notification
from .serializers import NotificationSerializer


permission_classes = (IsAuthenticated,)


@api_view(['GET'])
def user_notifications(request, user_id):
    """
    Gets all the notifications for a given user.
    :param request: GET Request.
    :param user_id: User ID.
    :return: JSONResponse containing all the notifications for the user (success),
        HttpResponse not found (failure).
    """
    if request.method == 'GET':
        notifications = Notification.objects.filter(user_id=user_id)
        serializer = NotificationSerializer(notifications, many=True)
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse(status=404)


@api_view(['POST'])
def add_notification(request):
    """
    Adds a new notification for a user.
    :param request: Notification model.
    :return: HttpResponse: 201 created (success),
        400 bad request (failure).
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NotificationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def notification_detail(request, pk):
    """
    Basic operations for notifications (get, update, and delete single notification).
    :param request: GET, PUT, or DELETE Request.
    :param pk: The notification's primary key.
    :return: JsonResponse with the notification details (GET success),
        JsonResponse with updated notification details (PUT success),
        HttpResponse no content (DELETE success),
        HttpResponse not found (notification not found),
        HttpResponse bad request (PUT failure),
        HttpResponse internal server error (DELETE failure).
    """
    try:
        notification = Notification.objects.get(pk=pk)
    except notification.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = NotificationSerializer(notification)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = NotificationSerializer(notification, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        delete = notification.delete()
        if delete:
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=500)


@api_view(['POST'])
def notification_email(request):
    """
    Sends a notification email.
    :param request: JSON object that contains subject, message, and receiver.
    :return: HttpResponse: 204 no content (success),
            500 internal server error (failure).
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        send_mail(
            data['subject'],
            data['message'],
            'sdmay2042@gmail.com',
            [data['receiver']],
            fail_silently=False
        )
        return HttpResponse(status=204)
    return HttpResponse(status=500)
