from typing import List
import json


def adjust_coordinates(coordinates: List[List[float]]):
    adjusted_coords = []
    crosses_antimeridian = False

    for coord in coordinates:
        longitude = coord[1]
        if longitude > 180:
            longitude -= 360
            crosses_antimeridian = True
        adjusted_coords.append([coord[0], longitude])
    return adjusted_coords, crosses_antimeridian


def process_message(msg):
    data = json.loads(msg)
    geometry = data.get("geometry")
    coordinates = geometry['coordinates'][0]
    coords, antimeridian = adjust_coordinates(coordinates)
    data['properties']['antimeridian'] = antimeridian
    data['geometry']['coordinates'] = [coords]
    return data
