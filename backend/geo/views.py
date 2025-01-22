from rest_framework import viewsets
from .models import PolygonModel
from .serializers import PolygonSerializer


class PolygonViewSet(viewsets.ModelViewSet):
    queryset = PolygonModel.objects.all()
    serializer_class = PolygonSerializer
