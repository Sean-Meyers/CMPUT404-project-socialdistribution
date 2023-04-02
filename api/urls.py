from django.urls import path
from . import views

"""
authors/: Lists all authors and maps to the AuthorsView class-based view. It is named 'Index'.
authors/<str:author_id>: Displays a specific author's profile based on their ID and maps to the AuthorView class-based view. It is named 'Author'.
authors/<str:author_id>/image: Displays the image associated with a specific author and maps to the ImageView class-based view. It is named 'Author Image'.
authors/<str:author_id>/followers: Lists the followers of a specific author and maps to the FollowersView class-based view. It is named 'Followers'.
authors/<str:author_id>/followers/<str:foreign_author_id>: Represents a specific follow relationship and maps to the FollowView class-based view. It is named 'Follow'.
authors/<str:author_id>/posts/: Lists all posts created by a specific author and maps to the PostsView class-based view. It is named 'Posts'.
authors/<str:author_id>/posts/<str:post_id>: Displays a specific post by its ID and maps to the PostView class-based view. It is named 'Post'.
authors/<str:author_id>/posts/<str:post_id>/image: Displays the image associated with a specific post and maps to the ImageView class-based view. It is named 'Post Image'.
authors/<str:author_id>/posts/<str:post_id>/comments: Lists all comments on a specific post and maps to the CommentsView class-based view. It is named 'Comments'.
authors/<str:author_id>/posts/<str:post_id>/likes: Represents the likes for a specific post and maps to the LikeView class-based view. It is named 'Likes'.
authors/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>/likes: Represents the likes for a specific comment and maps to the GetLikeCommentView class-based view. It is named 'Comment Likes'.
authors/<str:author_id>/liked: Lists all liked content for a specific author and maps to the LikedView class-based view. It is named 'Liked'.
authors/<str:author_id>/inbox/: Represents the inbox of a specific author and maps to the InboxView class-based view. It is named 'Inbox'.
nodes/: Represents the node management interface and maps to the NodeView class-based view. It is named 'Node Request'.
"""

urlpatterns = [
    path('authors/', views.AuthorsView.as_view(), name='Index'),
    path('authors/<str:author_id>', views.AuthorView.as_view(), name='Author'),
    path('authors/<str:author_id>/image', views.ImageView.as_view(), name='Author Image'),
    path('authors/<str:author_id>/followers', views.FollowersView.as_view(), name='Followers'),
    path('authors/<str:author_id>/followers/<str:foreign_author_id>', views.FollowView.as_view(), name='Follow'),
    path('authors/<str:author_id>/posts/', views.PostsView.as_view(), name='Posts'),
    path('authors/<str:author_id>/posts/<str:post_id>', views.PostView.as_view(), name='Post'),
    path('authors/<str:author_id>/posts/<str:post_id>/image', views.ImageView.as_view(), name='Post Image'),
    path('authors/<str:author_id>/posts/<str:post_id>/comments', views.CommentsView.as_view(), name='Comments'),
    path('authors/<str:author_id>/posts/<str:post_id>/likes', views.LikeView.as_view(), name='Likes'),
    path('authors/<str:author_id>/posts/<str:post_id>/comments/<str:comment_id>/likes', views.GetLikeCommentView.as_view(), name='Comment Likes'),
    path('authors/<str:author_id>/liked', views.LikedView.as_view(), name='Liked'),
    path('authors/<str:author_id>/inbox/', views.InboxView.as_view(), name='Inbox'),
    
    # path('authors/<str:author_id>/share/<str:encoded_post_url>/<str:encoded_destination_author_url>', views.ShareView.as_view(), name='Share'), 
    
    path('nodes/', views.NodeView.as_view(), name='Node Request'),
]
