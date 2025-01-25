from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PolygonViewSet, IntersectionViewSet


router = DefaultRouter()
router.register(r'polygons', PolygonViewSet)
router.register(r'intersections', IntersectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
