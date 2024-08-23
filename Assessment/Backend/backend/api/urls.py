from django.urls import path
from . import views

urlpatterns = [
    path("blogposts/", views.BlogPostListCreate.as_view(), name="blogpost-view-create"),
    path(
        "blogposts/<int:pk>/",
        views.BlogPostRetrieveUpdateDestory.as_view(),
        name="update",
    ),
        path("users/", views.UserListCreate.as_view(), name="user-view-create"),
    path(
        "users/<int:pk>/",
        views.UserRetrieveUpdateDestory.as_view(),
        name="update",
    ),
    path('login/', views.UserLoginView.as_view(), name='login'),
]