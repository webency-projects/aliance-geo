from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import PolygonModel
from .serializers import PolygonSerializer
from django.contrib.gis.geos import GEOSGeometry
import json


class PolygonViewSet(viewsets.ModelViewSet):
    queryset = PolygonModel.objects.all()
    serializer_class = PolygonSerializer

    def create(self, request, *args, **kwargs):
        geometry = request.data.get('geometry')
        properties = request.data.get('properties')
        if not properties:
            return Response({"error": "Properties is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not geometry:
            return Response({"error": "Geometry is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            polygon = GEOSGeometry(json.dumps(geometry))
        except Exception as e:
            return Response({"error": "Geometry is required."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={
            "name": properties['name'],
            "polygon": polygon
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)

