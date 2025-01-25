from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from .models import PolygonModel, IntersectionModel


class PolygonSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = PolygonModel
        geo_field = 'polygon'
        fields = ('id', 'name', 'polygon', 'antimeridian')


class IntersectionSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = IntersectionModel
        geo_field = 'coordinates'
        fields = ('id', 'intersected_polygon_name', 'coordinates')
