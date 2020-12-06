from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

from .models import Camera
from .serializers import CameraSerializer


permission_classes = (IsAuthenticated,)


@api_view(['GET'])
def user_cameras(request, user_id):
    """
    Gets all the cameras for a given user.
    :param request: GET Request.
    :param user_id: User ID.
    :return: JSONResponse containing all the cameras for the user (success),
        HttpResponse not found (failure).
    """
    if request.method == 'GET':
        cameras = Camera.objects.filter(user_id=user_id)
        serializer = CameraSerializer(cameras, many=True)
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse(status=404)


@api_view(['POST'])
def add_camera(request):
    """
    Adds a new camera for a user.
    :param request: Camera model.
    :return: HttpResponse: 201 created (success),
        400 bad request (failure).
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CameraSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def camera_detail(request, pk):
    """
    Basic operations for cameras (get, update, and delete single notification).
    :param request: GET, PUT, or DELETE Request.
    :param pk: The camera's primary key.
    :return: JsonResponse with the camera details (GET success),
        JsonResponse with updated camera details (PUT success),
        HttpResponse no content (DELETE success),
        HttpResponse not found (camera not found),
        HttpResponse bad request (PUT failure),
        HttpResponse internal server error (DELETE failure).
        """
    try:
        camera = Camera.objects.get(pk=pk)
    except Camera.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CameraSerializer(camera)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CameraSerializer(camera, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        delete = camera.delete()
        if delete:
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=500)
