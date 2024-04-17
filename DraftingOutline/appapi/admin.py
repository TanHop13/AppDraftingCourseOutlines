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
    readonly_fields = ['my_image']
    form = OutlineForm

    def my_image(self, course):
        if course.image:
            return mark_safe(f"<img width='200' src={course.image.url} />")

    class Media:
        css = {
            'all': ['/static/css/style.css']
        }


# class UserForm(admin.ModelAdmin):
#     list_display = ['username', 'password', 'first_name', 'last_name', 'role', 'email', 'avatar']


class SubjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


# class UserForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = '__all__'
#         widgets = {
#             'role': forms.TextInput(attrs={'class': 'form-control'}),
#         }
#
#
# class UserAdmin(admin.ModelAdmin):
#     form = UserForm


admin.site.register(Course)
admin.site.register(Outline, OutlineAdmin)
admin.site.register(Subject)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(User)
