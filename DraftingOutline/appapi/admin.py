from django.contrib import admin
from appapi.models import Subject, Outline, Course, Tag, Comment, User
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class OutlineForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Outline
        fields = '__all__'


class OutlineAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_date', 'updated_date']
    list_filter = ['id', 'name', 'created_date']
    search_fields = ['name', 'description']
    form = OutlineForm


class SubjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'stc']
    search_fields = ['name', 'stc']


class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']
    list_filter = ['id', 'name']


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'username']
    search_fields = ['last_name']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id']


admin.site.register(Course, CourseAdmin)
admin.site.register(Outline, OutlineAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Tag)
admin.site.register(Comment, CommentAdmin)
admin.site.register(User, UserAdmin)
