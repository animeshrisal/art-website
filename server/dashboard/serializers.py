from django.shortcuts import render
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Gallery, Tags, Artwork, Comment, Notification, User
import json
from django.db import transaction

# Create your views here.

class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField()  
    username = serializers.CharField(read_only=True)
    following_count = serializers.SerializerMethodField()
    follower_count = serializers.SerializerMethodField()

    def get_following_count(self, obj):
        return obj.following_count()

    def get_follower_count(self, obj):
        return obj.followers_count()

    class Meta:
        model = User
        fields = ('id', 'username', 'profile_pic', 'following_count', 'follower_count')

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
    user =  UserSerializer(read_only=True)


    def create(self, validated_data):
        comment = Comment.objects.create(
            comment=validated_data['comment'], 
            artwork_id=self.context['artwork'].id,
            user=self.context['commentor']
        )

        Notification.objects.create(
            type = 1,
            data = { 'commentor': self.context['commentor'].username },
            user = self.context['artwork'].owned_by
        )
                
        return comment

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'user', 'created_at')

class NotificationSerializer(serializers.ModelSerializer):
    type = serializers.IntegerField()
    data = serializers.JSONField()
    read = serializers.BooleanField()

    class Meta:
        model = Notification
        fields = ('id', 'type', 'data', 'read')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ('id', 'name')

class ArtworkSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField()
    image = serializers.ImageField(required=True)  
    total_likes = serializers.SerializerMethodField()
    tags = TagSerializer(read_only=True, many=True)
    owned_by = UserSerializer(read_only=True)

    def get_total_likes(self, obj):
        return obj.likes.count()
    
    def create(self, validated_data):
        with transaction.atomic():
            artwork = Artwork.objects.create(
                name=validated_data['name'], 
                description=validated_data['description'],
                image=validated_data['image'],
                owned_by=self.context['request'].user
            )

            tag_input= list(set(self.context['request'].data.get('tags', []).split(',')))
            tags_list = []
            for tag in tag_input:
                tags_list.append(
                    Artwork.tags.through(
                        artwork=artwork, 
                        tags=Tags.objects.get_or_create(name=tag)[0]
                        )
                    )
            Artwork.tags.through.objects.bulk_create(tags_list) 

            return artwork

    class Meta:
        model = Artwork
        fields = ('id', 'name', 'description', 'image', 'total_likes', 'tags', 'owned_by')

class FeedSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    image = serializers.ImageField(required=True)
    total_likes = serializers.SerializerMethodField()
    owned_by = UserSerializer(read_only=True)
    
    def get_total_likes(self, obj):
        return obj.total_likes()

    class Meta:
        model = Artwork
        fields = ('id', 'name', 'image', 'total_likes', 'owned_by')