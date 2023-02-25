from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import AuthorModel
from .serializers import AuthorSerializer
import json

@api_view(['GET', 'POST'])
def AuthorView(request, uid):
    """
    API endpoint that allows users to be viewed or edited.
    """
    if request.method == 'GET':
        author_object = AuthorModel.objects.get(id=uid)
        serialized_object = AuthorSerializer(author_object)
        output = serialized_object.data
        return JsonResponse(output, status = 200)

    elif request.method == 'POST':
        author_object = AuthorModel.objects.get(id=uid)
        serialized_object = AuthorSerializer(author_object)
        parameters = json.loads(request.body)
        serialized_object.update(author_object, parameters)
        output = serialized_object.data
        return JsonResponse(output, status = 200)

@api_view(['GET'])
def AuthorsView(request):
    """
    API endpoint that allows users to be viewed or edited.
    """
    page = int(request.GET.get('page', '1'))
    size = int(request.GET.get('size', '5'))
    authors_list = AuthorModel.objects.order_by('-displayName')[page*size-5:page*size-1]
    # print(authors_list)
    serialized_authors_list = list([AuthorSerializer(author).data for author in authors_list])
    output = {
    "type": "authors",      
    "items": serialized_authors_list,
    }
    return JsonResponse(output, status = 200)

@api_view(['GET'])
def AuthorFollowersView(request, uid):
    """
    API endpoint that allows users to be viewed or edited.
    """
    
    author_object = AuthorModel.objects.get(id=uid).followers
    # serialized_object = AuthorSerializer(author_object)
    # output = serialized_object.data
    return JsonResponse({uid:author_object}, status = 200)

@api_view(['DELETE', 'PUT', 'GET'])
def AuthorFollowersOperationsView(request, uid, foreign_uid):
    """
    API endpoint that allows users to be viewed or edited.
    """

    if request.method == 'GET':
        author_object = AuthorModel.objects.get(id=uid).followers
        if foreign_uid in author_object:
            return JsonResponse({"status": "success"}, status = 200)
        else:
            return JsonResponse({"status": "failure"}, status = 200)

    elif request.method == 'PUT':
        author_object = AuthorModel.objects.get(id=uid)
        author_object.followers.append(foreign_uid)
        serialized_object = AuthorSerializer(author_object)
        parameters = json.loads(request.body)
        output = serialized_object.data
        author_object.save()
        return JsonResponse(output, status = 200)
    
    elif request.method == 'DELETE':
        author_object = AuthorModel.objects.get(id=uid)
        author_object.followers.remove(foreign_uid)
        serialized_object = AuthorSerializer(author_object)
        parameters = json.loads(request.body)
        output = serialized_object.data
        author_object.save()
        return JsonResponse(output, status = 200)
    




