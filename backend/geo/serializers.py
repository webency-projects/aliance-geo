from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import PolygonModel


class PolygonSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = PolygonModel
        geo_field = 'polygon'
        fields = '__all__'
