from django.urls import path, include
from appapi import views
from rest_framework import routers

r = routers.DefaultRouter()
r.register('subjectsList', views.SubjectListView, basename='subjects')
r.register('subjectsCreate', views.SubjectViewSet, basename='subjectsCreate')
r.register('courses', views.CourseViewSet, basename='courses')
r.register('outlinesList', views.OutlineListView, basename='outlines')
r.register('outlinesCreate', views.OutlineViewSet, basename='outlinesCreate')
r.register('users', views.UserViewSet, basename='users')
r.register('comments', views.CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(r.urls)),
    # path('', views.index, name='index'),
]
