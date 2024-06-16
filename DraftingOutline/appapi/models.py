from gettext import gettext
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from ckeditor_uploader.fields import RichTextUploadingField


class User(AbstractUser):
    ADMIN = 1
    Lecturer = 2
    Student = 3
    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (Lecturer, 'Lecturer'),
        (Student, 'Student'),
    )
    role = models.IntegerField(choices=ROLE_CHOICES, default=Student)
    avatar = CloudinaryField(null=False, default="https://res.cloudinary.com/dvzsftuep/image/upload/v1718008117/e83yxveneoxzwh4ehfvu.png")

    def get_email(self):
        return gettext(self.email)


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

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stc = models.IntegerField(default=3)
    course = models.ManyToManyField(Course)
    image = CloudinaryField(null=False, default="https://res.cloudinary.com/dvzsftuep/image/upload/v1718008117/e83yxveneoxzwh4ehfvu.png")

    def __str__(self):
        return self.name


class Outline(BaseModel):
    name = models.CharField(max_length=255)
    description = RichTextUploadingField(null=True, blank=True)
    up_file = CloudinaryField(null=False, default=None)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tag = models.ManyToManyField(Tag)

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
