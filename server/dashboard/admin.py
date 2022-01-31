from django.contrib import admin
from .models import Artwork, Comment, Gallery, Notification, Tags

# Register your models here.
admin.site.register(Artwork)
admin.site.register(Gallery)
admin.site.register(Tags)
admin.site.register(Comment)
admin.site.register(Notification)