from django.contrib.gis.db import models


class PolygonModel(models.Model):
    name = models.CharField(max_length=200)
    polygon = models.PolygonField()
    antimeridian = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class IntersectionModel(models.Model):
    polygon = models.ForeignKey(PolygonModel, on_delete=models.CASCADE)
    intersected_polygon_name = models.CharField(max_length=100)
    coordinates = models.PolygonField()

    def __str__(self):
        return f"{self.polygon.name} intersects with {self.intersected_polygon_name}"