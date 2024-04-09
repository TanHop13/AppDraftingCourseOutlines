from rest_framework import viewsets, generics,  status, parsers, permissions
from .models import Subject, Outline, Course, Tag, Comment, Like, User
import serializers, paginators, perms
from rest_framework.decorators import action
from rest_framework.response import Response


class SubjectViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectSerializers


class OutlineViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.prefetch_related('tag').filter(active=True)
    serializer_class = serializers.OutlineDetailsSerializer
    pagination_class = paginators.OutlinePaginator


class CourseViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = serializers.CourseSerializers


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializers
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ["get_current_user"]:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=["get", "patch"], url_path="current_user", detail=False)
    def get_current_user(self, request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializers(user).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializers
    permission_classes = [perms.CommentOwner]
