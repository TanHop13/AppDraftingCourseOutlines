from rest_framework import permissions


class CommentOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return super().has_permission(request, view) and request.user == comment.user


class OutlineOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, outline):
        return super().has_permission(request, view) and request.user == outline.user


class UserOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, user):
        return super().has_permission(request, view) and request.user == user.user


class CourseOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, course):
        return super().has_permission(request, view) and request.user == course.user


class SubjectOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, subject):
        return super().has_permission(request, view) and request.user == subject.user
