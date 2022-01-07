from shared.models import TimeStampedModel
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
# Create your models here.


class User(AbstractUser):
    followers = models.ManyToManyField('self')
    profile_pic = models.ImageField(
        upload_to="profile_pic", default="profile_pic/default.jpg")

    def followers_count(self):
        return self.followers.count()

    def following_count(self):
        return User.objects.filter(followers=self).count()

    def follow(self, user):
        self.followers.add(user)

    def unfollow(self, user):
        self.followers.remove(user)


class Gallery(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name


class Tags(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Artwork(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField()
    gallery = models.ManyToManyField(Gallery)
    tags = models.ManyToManyField(Tags)
    likes = models.ManyToManyField(User, related_name='likes')
    owned_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owned_by')

    def like(self, user):
        self.likes.add(user)

    def unlike(self, user):
        self.likes.remove(user)

    def total_likes(self):
        self.likes.count()

    def __str__(self):
        return self.name


class Comment(TimeStampedModel):
    comment = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)


class Notification(TimeStampedModel):
    class NotificationType(models.IntegerChoices):
        COMMENT_ON_ARTWORK = 1, _('Comment on Artwork')
        FOLLOWED_YOU = 2, _('Followed You')

    type = models.IntegerField()
    data = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    initiator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='initiator')
    read = models.BooleanField(default=False)
