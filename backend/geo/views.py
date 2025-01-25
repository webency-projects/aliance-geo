from rest_framework import viewsets, status

from rest_framework.response import Response
from .models import PolygonModel, IntersectionModel
from .serializers import PolygonSerializer, IntersectionSerializer
from django.contrib.gis.geos import GEOSGeometry
from geo.kafka.kafka_producer import KafkaProducer
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

        KafkaProducer.send(request.data)

        return Response({"success": True}, status=201)


class IntersectionViewSet(viewsets.ModelViewSet):
    queryset = IntersectionModel.objects.all()
    serializer_class = IntersectionSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
