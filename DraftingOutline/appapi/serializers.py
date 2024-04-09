from rest_framework import serializers
from .models import Subject, Outline, Course, Tag, Comment, Like, User


class SubjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class CourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ItemSerializers(serializers.ModelSerializer):
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['image'] = instance.image.url
        return rep


class OutlineSerializers(ItemSerializers):
    class Meta:
        model = Outline
        fields = ['id', 'name', 'description', 'image', 'create_date']


class TagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class OutlineDetailsSerializer(OutlineSerializers):
    tag = TagSerializers(many=True)

    class Meta:
        model = OutlineSerializers.Meta.model
        fields = OutlineSerializers.Meta.fields + ['tag', 'description']


class UserSerializers(serializers.ModelSerializer):
    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'email', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': 'true'
            }
        }


class CommentSerializers(serializers.ModelSerializer):
    user = UserSerializers()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'create_date', 'user']
