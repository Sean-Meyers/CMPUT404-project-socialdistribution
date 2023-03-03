from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import AuthorModel, PostsModel, CommentsModel, LikeModel
from .serializers import PostsSerializer, AuthorSerializer, CommentsSerializer, LikeSerializer
import json
import uuid

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
    

@api_view(['GET', 'PUT'])
def FollowView(request, uid, uid2):
    """
    API endpoint that allows users to be viewed or edited.
    """
    #checks friendship
    if request.method == 'GET':
        author_object = AuthorModel.objects.get(id=uid).followers
        if uid2 in author_object:
            author_object_2 = AuthorModel.objects.get(id=uid2).followers
            if uid in author_object_2:
                return JsonResponse({"status": "true_friends"}, status = 200)
            else:
                return JsonResponse({"status": "friends"}, status = 200)
        else:
            author_object_2 = AuthorModel.objects.get(id=uid2).followers
            if uid in author_object_2:
                return JsonResponse({"status": "friends"}, status = 200)
            else:
                return JsonResponse({"status": "not friends"}, status = 200)
    elif request.method == 'PUT':
        author_object = AuthorModel.objects.get(id=uid)
        author_object2 = AuthorModel.objects.get(id=uid2)
        author_object.followers.append(uid2)
        serialized_object = AuthorSerializer(author_object)
        serialized_object2 = AuthorSerializer(author_object2)
        parameters = json.loads(request.body)
        output = serialized_object.data
        output2 = serialized_object2.data

        author_object.save()
        follow_output = {
            "type": "Follow",
            "type": serialized_object.displayName + " wants to follow " + serialized_object2.displayName,      
            "actor": output,
            "object": output2,
        }

        return JsonResponse(follow_output, status = 200)
    
@api_view(['GET', 'POST'])
def PostsView(request, author_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    #checks friendship
    posts_paginated = []
    if request.method == 'GET':
        post_object = PostsModel.objects.filter(author=author_id).order_by('-published')[0:4] #TODO: pagination
        for post in post_object:
            serialized_object = PostsSerializer(post)
            posts_paginated.append(serialized_object.data)
        output = {"posts": posts_paginated}
        return JsonResponse(output, status = 200)
    elif request.method == 'POST':
        PostsModel.objects.create(author=author_id, id=str(uuid.uuid4()))
        return JsonResponse({"status":"success"}, status = 200)

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def PostsRetriveView(request, author_id, post_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    if request.method == 'GET':
        post_object = PostsModel.objects.get(id=post_id)
        serialized_object = PostsSerializer(post_object)
        return JsonResponse(serialized_object.data, status = 200)
    elif request.method == 'POST':
        post_object = PostsModel.objects.get(id=post_id)
        serialized_object = PostsSerializer(post_object)
        parameters = json.loads(request.body)
        serialized_object.update(post_object, parameters)
        return JsonResponse({"status":"success"}, status = 200)
    elif request.method == 'DELETE':
        PostsModel.objects.filter(author=author_id, id=post_id).delete()
        return JsonResponse({"status":"success"}, status = 200)
    elif request.method == 'PUT':
        PostsModel.objects.create(author=author_id, id=post_id)
        return JsonResponse({"status":"success"}, status = 200)

@api_view(['GET', 'POST'])
def CommentsView(request, author_id, post_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    posts_paginated = []
    page = int(request.GET.get('page', '1'))
    size = int(request.GET.get('size', '5'))
    if request.method == 'GET':
        post_object = CommentsModel.objects.filter(post_id=post_id).order_by('-published')[page*size-5:page*size-1]
        for post in post_object:
            serialized_object = CommentsSerializer(post)
            serialized_object.data["author"] = AuthorSerializer(AuthorModel.objects.get(id=serialized_object.data["author"])).data
            posts_paginated.append(serialized_object.data)
        output = {"type":"comments",
            "page": page,
            "size": size,
            "post": post_id,
            "id": post_id, #TODO: i have no idea what is going on here?
            "comments": posts_paginated}
        return JsonResponse(output, status = 200)
    elif request.method == 'POST':
        parameters = json.loads(request.body)
        if parameters["type"] == "comment":
            CommentsModel.objects.create(**parameters)
        post_object = CommentsModel.objects.filter(post_id=post_id).order_by('-published')[page*size-5:page*size-1]
        for post in post_object:
            serialized_object = CommentsSerializer(post)
            serialized_object.data["author"] = AuthorSerializer(AuthorModel.objects.get(id=serialized_object.data["author"])).data
            posts_paginated.append(serialized_object.data)
        output = {"type":"comments",
            "page": page,
            "size": size,
            "post": post_id,
            "id": post_id, #TODO: i have no idea what is going on here?
            "comments": posts_paginated}
        return JsonResponse(output, status = 200)



@api_view(['POST'])
def InboxView(request, author_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    parameters = json.loads(request.body)["object"]
    liker_author_id = parameters["author"].split("/")[3]
    liker_author_object = AuthorModel.objects.get(id=liker_author_id)
    liker_serialized = AuthorSerializer(liker_author_object).data
    liker_author_displayName = liker_serialized["displayName"]
    if "comment" in parameters:
        output = {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": liker_author_displayName + " Likes your comment",
        "type": "Like",
        "author": liker_serialized,
        "object": parameters
        }
    else:
        output = {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": liker_author_displayName + " Likes your post",
        "type": "Like",
        "author": liker_serialized,
        "object": parameters
        }

    #post_request should be a json object with link to inbox
    LikeModel.objects.create(**output)
    return JsonResponse({"status":"success"}, status = 200)

@api_view(['GET'])
def PostLikeView(request, author_id, post_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    post_likes_paginated = []
    object = "http://127.0.0.1:5454/authors/"+ author_id+ "/posts/"+ post_id
    post_likes_object = LikeModel.objects.filter(object=object)
    for likes in post_likes_object:
        serialized_object = LikeSerializer(likes)
        post_likes_paginated.append(serialized_object.data)
    output = {"object": object, "likes": post_likes_paginated}
    return JsonResponse(output, status = 200)

@api_view(['GET'])
def PostLikeView(request, author_id, post_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    post_likes_paginated = []
    object = "http://127.0.0.1:5454/authors/"+ author_id+ "/posts/"+ post_id + "/"
    post_likes_object = LikeModel.objects.filter(object=object)
    for likes in post_likes_object:
        serialized_object = LikeSerializer(likes)
        post_likes_paginated.append(serialized_object.data)
    output = {"object": object, "likes": post_likes_paginated}
    return JsonResponse(output, status = 200)



@api_view(['GET'])
def CommentLikeView(request, author_id, post_id, comment_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    comment_likes_paginated = []
    object = "http://127.0.0.1:5454/authors/"+ author_id+ "/posts/"+ post_id+ "/comments/"+ comment_id + "/"
    comment_likes_object = LikeModel.objects.filter(object=object)
    for likes in comment_likes_object:
        serialized_object = LikeSerializer(likes)
        comment_likes_paginated.append(serialized_object.data)
    output = {"object": object, "likes": comment_likes_paginated}
    return JsonResponse(output, status = 200)

@api_view(['GET'])
def LikedView(request, author_id):
    """
    API endpoint that allows users to be viewed or edited.
    """
    liked_paginated = []
    liked_object = LikeModel.objects.filter(author=author_id)
    for liked in liked_object:
        serialized_object = LikeSerializer(liked).data
        if "comments" not in serialized_object["object"]:
            post_id = liked["object"].split("/")[6]
            post_object = PostsSerializer(PostsModel.objects.get(id=post_id)).data["visibility"]
            if post_object == "PUBLIC":
                liked_paginated.append(serialized_object.data)
    output = {"author_id": author_id, "likes": liked_paginated}
    return JsonResponse(output, status = 200)