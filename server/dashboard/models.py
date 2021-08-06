from shared.models import TimeStampedModel
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
# Create your models here.
 

class User(AbstractUser):
    followers = models.ManyToManyField('self')

    def count_followers(self):
        return self.followers.count()
    
    def count_following(self):
        return User.objects.filter(followers=self).count()

class Gallery(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()

class Tags(models.Model):
    name = models.CharField(max_length=200)

class Artwork(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField()
    gallery = models.ManyToManyField(Gallery)
    tags = models.ManyToManyField(Tags)
    likes = models.ManyToManyField(User, related_name='likes')
    owned_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_by')

    def like(self, user):
        self.likes.add(user)

    def unlike(self, user):
        self.likes.remove(user)


class Comment(TimeStampedModel):
    comment = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)

class Notification(TimeStampedModel):
    class NotificationType(models.IntegerChoices):
        COMMENT_ON_ARTWORK = 1, _('Comment on Artwork')
    
    type = models.IntegerField()
    data = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)

