from rest_framework import viewsets, generics, status, parsers, permissions
from appapi.models import Subject, Outline, Course, Tag, Comment, Like, User
from appapi import serializers, paginators, perms, stactic
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template import loader
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from DraftingOutline.settings import EMAIL_HOST_USER
from django.http import HttpResponse
# from rest_framework.permissions import IsAdminUser, IsAuthenticated


class SubjectViewSet(viewsets.ViewSet, generics.ListAPIView,
                     generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectSerializers
    permission_classes = [perms.SubjectOwner]


class OutlineViewSet(viewsets.ViewSet, generics.ListAPIView,
                     generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Outline.objects.prefetch_related('tag').filter(active=True)
    serializer_class = serializers.OutlineDetailsSerializers
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
        # Gửi bằng text
        # subject = "Comment was created"
        # message = "Dear" + " " + request.user.get_full_name() + " , your comment was uploaded"
        # email = request.user.get_email()
        # recipient_list = [email]
        # send_mail(subject, message, EMAIL_HOST_USER, recipient_list, fail_silently=True)

        # Gửi bằng html
        subject = "Email from Drafting Subject Outline"
        email = request.user.get_email()
        recipient_list = [email]
        html_message = render_to_string("email.html")
        plain_message = strip_tags(html_message)
        message = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=None,
            to=recipient_list,
        )
        message.attach_alternative(html_message, "text/html")
        message.send()

        return Response(serializers.CommentSerializers(comment).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='likes', detail=True)
    def like(self, request, pk):
        li, created = Like.objects.get_or_create(outline=self.get_object(), user=request.user)

        if not created:
            li.active = not li.active
            li.save()

        return Response(serializers.OutlineDetailsSerializers(self.get_object()).data, status=status.HTTP_200_OK)

    # @action(methods=['post'], url_path='search', detail=False)
    # def search(self, request):
    #     pass


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView,
                    generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = serializers.CourseSerializers
    permissions_classes = [perms.CourseOwner]


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.DestroyAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializers
    parser_classes = [parsers.MultiPartParser, ]
    permission_classes = [perms.UserOwner]

    def get_permissions(self):
        if self.action in ["get_current_user", "update_info"]:
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

    @action(methods=['post'], url_path='login', detail=False)
    def login(self, request):
        serializer = serializers.LoginSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

    @action(methods=['post', 'get'], url_path='get_token', detail=False)
    def refresh_token(self, request):
        refresh_token = request.data.get('refresh', None)

        if not refresh_token:
            return Response({'error': 'refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'access': access_token
                         }, status=status.HTTP_200_OK)

    @action(methods=['put'], detail=False, url_path='update_info')
    def update_info(self, request):
        user = request.user

        serializer = serializers.UserSerializers(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializers
    permission_classes = [perms.CommentOwner]

    def sendmail(self, request):
        data = request.data
        subject = "Comment is change"
        message = "Dear" + " " + data['last_name'] + " , you are change your comment"
        email = data['email']
        recipient_list = [email]
        send_mail(subject, message, EMAIL_HOST_USER, recipient_list, fail_silently=True)


# from django.shortcuts import render, redirect
# from django import forms


# class UserForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = '__all__'
#         widgets = {
#             'role': forms.TextInput(attrs={'class': 'form-control'}),
#         }
#
#
# def index(request):
#     users = User.objects.all()
#
#     if request.method == 'POST':
#         form = UserForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('index')
#     else:
#         form = UserForm()
#
#     context = {
#         "products": users,
#         "form": form
#     }
#
#     return render(request, 'chartapp/index.html', context)
