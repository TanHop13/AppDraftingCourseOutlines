from django.urls import path, include
import views
from rest_framework import routers

r = routers.DefaultRouter()
r.register('subject', views.SubjectViewSet, basename='subjects')
r.register('courses', views.CourseViewSet, basename='courses')
r.register('outlines', views.OutlineViewSet, basename='outlines')
r.register('users', views.UserViewSet, basename='users')
r.register('comments', views.CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(r.urls))
]
