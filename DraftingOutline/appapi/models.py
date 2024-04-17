from gettext import gettext

from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField


class User(AbstractUser):
    ADMIN = 1
    Lecturer = 2
    Student = 3
    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (Lecturer, 'Lecturer'),
        (Student, 'User'),
    )
    role = models.IntegerField(choices=ROLE_CHOICES, default=ADMIN)
    avatar = CloudinaryField(null=False)

    def get_email(self):
        return gettext(self.email)

    # avatar = models.ImageField(upload_to="users/%Y/%m/")
    # is_superuser = None
    # is_staff = None


class Subject(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Course(BaseModel):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Outline(BaseModel):
    name = models.CharField(max_length=255)
    description = RichTextField(null=False)
    image = CloudinaryField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag = models.ManyToManyField(Tag, null=True)

    def __str__(self):
        return self.name


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=255)


class Like(Interaction):
    class Meta:
        unique_together = ('user', 'outline')
