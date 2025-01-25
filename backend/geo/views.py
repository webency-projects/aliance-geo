from rest_framework import viewsets, status

from rest_framework.response import Response
from .models import PolygonModel
from .serializers import PolygonSerializer
from django.contrib.gis.geos import GEOSGeometry
from .kafka import send_message
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
        send_message(request.data)

        return Response({"success": True}, status=201)


