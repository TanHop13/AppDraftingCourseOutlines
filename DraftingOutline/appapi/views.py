from rest_framework import viewsets, generics,  status, parsers, permissions
from appapi.models import Subject, Outline, Course, Tag, Comment, Like, User
from appapi import serializers, paginators, perms
from rest_framework.decorators import action
from rest_framework.response import Response


class SubjectViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectSerializers


class OutlineViewSet(viewsets.ViewSet, generics.ListAPIView,
                     generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Outline.objects.prefetch_related('tag').filter(active=True)
    serializer_class = serializers.OutlineDetailsSerializer
    pagination_class = paginators.OutlinePaginator
    permission_classes = [perms.OutlineOwner]

    def get_permissions(self):
        if self.action in ["add_comment", "like"]:
            return [permissions.IsAuthenticated(), ]

        return [permissions.AllowAny(), ]

    @action(methods=['get'], url_path='comments', detail=True)
    def get_comments(self, request, pk):
        paginator = paginators.CommentPaginator()
        comments = self.get_object().comment_set.select_related('user').order_by("-id")
        page = paginator.paginate_queryset(comments, request)
        if page is not None:
            serializer = serializers.CommentSerializers(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        return Response(serializers.CommentSerializers(comments, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='comments', detail=True)
    def add_comment(self, request, pk):
        comment = self.get_object().comment_set.create(content=request.data.get('content'),
                                                       user=request.user)

        return Response(serializers.CommentSerializers(comment).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='likes', detail=True)
    def like(self, request, pk):
        li, created = Like.objects.get_or_create(outline=self.get_object(), user=request.user)

        if not created:
            li.active = not li.active
            li.save()

        return Response(serializers.OutlineDetailsSerializer(self.get_object()).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='search', detail=False)
    def search(self, request):
        pass

    # @action(methods=['post'], url_path='', detail=)
    # def add_outline(self):
    #     pass


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
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
