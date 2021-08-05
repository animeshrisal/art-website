from rest_framework.response import Response
from dashboard.serializers import ArtworkSerializer
from rest_framework import serializers, status, generics, mixins

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
