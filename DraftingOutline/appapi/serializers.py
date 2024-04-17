from rest_framework import serializers
from appapi.models import Subject, Outline, Course, Tag, Comment, User
from rest_framework_simplejwt.tokens import RefreshToken


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
        fields = ['id', 'name', 'description', 'image', 'created_date']


class TagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class OutlineDetailsSerializers(OutlineSerializers):
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
        fields = ['id', 'content', 'created_date', 'user']


class LoginSerializers(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username is None or password is None:
            raise serializers.ValidationError(
                'username and password is required!'
            )

        user = User.objects.filter(username=username).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError(
                'Incorrect username or password!'
            )

        token = RefreshToken.for_user(user)

        return {
            'success': True,
            'refresh': str(token),
            'access': str(token.access_token),
            'user': UserSerializers(user).data
        }
