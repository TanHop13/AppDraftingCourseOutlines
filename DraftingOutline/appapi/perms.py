from rest_framework import permissions


class CommentOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return super().has_permission(request, view) and request.user == comment.user


class OutlineOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, outline):
        return super().has_permission(request, view) and request.user == outline.user
