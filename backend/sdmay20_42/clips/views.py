from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from .models import Clip
from .serializers import ClipsSerializer


permission_classes = (IsAuthenticated,)


@api_view(['POST'])
def add_clip(request):
    """
    Adds a new clip for a user.
    :param request: Clip model.
    :return: HttpResponse: 201 created (success),
        400 bad request (failure).
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ClipsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def user_clips(request, user_id):
    """
    Gets all the clips for a given user.
    :param request: GET Request.
    :param user_id: User ID.
    :return: JSONResponse containing all the clips for the user (success),
        HttpResponse not found (failure).
    """
    if request.method == 'GET':
        clips = Clip.objects.filter(user_id=user_id)
        serializer = ClipsSerializer(clips, many=True)
        return JsonResponse(serializer.data, safe=False)
    return HttpResponse(status=404)


@api_view(['GET', 'PUT', 'DELETE'])
def clip_detail(request, pk):
    """
    Basic operations for clips (get, update, and delete single clip).
    :param request: GET, PUT, or DELETE Request.
    :param pk: The clip's primary key.
    :return: JsonResponse with the clip details (GET success),
        JsonResponse with updated clip details (PUT success),
        HttpResponse no content (DELETE success),
        HttpResponse not found (clip not found),
        HttpResponse bad request (PUT failure),
        HttpResponse internal server error (DELETE failure).
    """
    try:
        clip = Clip.objects.get(pk=pk)
    except Clip.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ClipsSerializer(clip)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ClipsSerializer(clip, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        delete = clip.delete()
        if delete:
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=500)
