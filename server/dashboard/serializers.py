from django.shortcuts import render
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Gallery, Tags, Artwork, Comment, Notification
# Create your views here.

class GallerySerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        required=True)
    description = serializers.CharField()

    def create(self, validated_data):
        gallery = Gallery.objects.create(
            name = validated_data['name'],
            description = validated_data['description'] 
            )
        return gallery

    class Meta:
        model = Gallery
        fields = ('id', 'name', 'description')

class CommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(required=True)

    def create(self, validated_data):
        comment = Comment.objects.create(
            comment=validated_data['comment'], 
            artwork=self.context['artwork'],
            user=self.context['user']
        )
        
        return comment

    class Meta:
        model = Comment
        fields = ('id', 'comment')

class NotificationSerializer(serializers.ModelSerializer):
    type = serializers.IntegerField()
    data = serializers.JSONField()
    read = serializers.BooleanField()

    class Meta:
        model = Notification
        fields = ('id', 'type', 'data', 'read')

class ArtworkSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField()
    image = serializers.ImageField(required=True)

    def create(self, validated_data):
        artwork = Artwork.objects.create(
            name=validated_data['name'], 
            description=validated_data['description'],
            image=validated_data['image'],
            owned_by=self.context['owned_by']
        )

        return artwork

    class Meta:
        model = Artwork
        fields = ('id', 'name', 'description', 'image')
