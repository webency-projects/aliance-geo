import json
from .serializers import PolygonSerializer, IntersectionSerializer
from .models import PolygonModel, IntersectionModel

from django.contrib.gis.geos import GEOSGeometry


def save_polygon(message):
    geometry = message['geometry']
    properties = message['properties']
    polygone_geos = GEOSGeometry(json.dumps(geometry))
    data = {
        "name": properties["name"],
        "polygon": polygone_geos,
        "antimeridian": properties['antimeridian']
    }
    serializer = PolygonSerializer(data=data)
    if serializer.is_valid():
        polygons = PolygonModel.objects.exclude(id=serializer.validated_data.get('id', None))
        is_exist = is_exist_polygon(polygone_geos, polygons)
        if not is_exist:
            serializer.save()
            print(f"Saved message")
    else:
        print(f"Error saving message: {serializer.errors}")


def is_exist_polygon(polygon, existing_polygons):
    intersects = []
    for poly in existing_polygons:
        if polygon.intersects(poly.polygon):
            intersects.append(poly)
    if intersects:
        intersection_records = []
        for intersected in intersects:
            intersection_records.append({
                'polygon': intersected,
                'intersected_polygon_name': intersected.name,
                'coordinates': str(polygon.intersection(intersected.polygon))
            })
        IntersectionModel.objects.bulk_create([IntersectionModel(**record) for record in intersection_records])
        return True
    return False
