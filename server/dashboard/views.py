from django.core.exceptions import ObjectDoesNotExist
from django.db.models import query
from shared.helpers import StandardResultsSetPagination
from rest_framework.response import Response
from dashboard.serializers import ArtworkSerializer, CommentSerializer, FeedSerializer
from rest_framework import serializers, status, generics
from rest_framework import viewsets, generics
from .models import Artwork, Comment, User


class ImageUpload(generics.CreateAPIView):
    serializer_class = ArtworkSerializer

    def create(self, request):
        context = {'request': request }
        serializer = ArtworkSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Feed(generics.ListAPIView):
    serializer_class = FeedSerializer
    queryset = Artwork.objects.all()
    pagination_class = StandardResultsSetPagination

    def list(self, request):
        context = {'request': request }
        queryset = self.queryset.filter(owned_by=request.user)
        page = self.paginate_queryset(queryset)
        serializers = FeedSerializer(page, many=True, context=context)
        result = self.get_paginated_response(serializers.data)
        return result

class RetrieveArtwork(generics.RetrieveAPIView):
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()

    def retrieve(self, request, pk):
        try:
            context = {'request': request}
            queryset = self.queryset.get(id=pk)
            serializer = ArtworkSerializer(queryset, context=context)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = StandardResultsSetPagination

    def list(self, request, artwork_pk):
        queryset = self.queryset.filter(artwork_id=artwork_pk)
        page = self.paginate_queryset(queryset)

        serializer = CommentSerializer(page, many=True)
        result = self.get_paginated_response(serializer.data)
        return result

    def create(self, request, artwork_pk):
        context = { 'artwork': artwork_pk, 'user': request.user }
        serializer = CommentSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentDestroyAPIView(generics.DestroyAPIView):
    queryset = Comment.objects.all()

    def destroy(self, request, artwork_pk, pk):   
        comment = self.queryset.get(id=pk, artwork_id=artwork_pk)
        if comment.delete():
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Cannot delete'}, status=status.HTTP_400_BAD_REQUEST)


class LikeAPIView(generics.CreateAPIView, generics.DestroyAPIView):
    queryset = Artwork.objects.all()

    def create(self, request, pk):
        try:
            artwork = self.queryset.get(id=pk)
            artwork.like(request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except  Artwork.DoesNotExist:
            return Response({'error': 'Artwork does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            artwork = self.queryset.get(id=pk)
            artwork.unlike(request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except  Artwork.DoesNotExist:
            return Response({'error': 'Artwork does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class FollowAPiView(generics.CreateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()

    def create(self, request, pk):
        try:
            user = self.queryset.get(id=pk)
            user.follow(request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            user = self.queryset.get(id=pk)
            user.unfollow(request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except  User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        
