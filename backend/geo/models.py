from django.contrib.gis.db import models


class PolygonModel(models.Model):
    name = models.CharField(max_length=200)
    polygon = models.PolygonField()
    antimeridian = models.BooleanField(default=False)

    def __str__(self):
        return self.name
