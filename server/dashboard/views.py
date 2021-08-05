from shared.helpers import StandardResultsSetPagination
from rest_framework.response import Response
from dashboard.serializers import ArtworkSerializer, CommentSerializer
from rest_framework import status, generics
from rest_framework import viewsets, generics
from .models import Artwork, Comment

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



class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


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
        comment = self.queryset.get(id=pk)
        if comment.delete():
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Cannot delete'}, status=status.HTTP_400_BAD_REQUEST)