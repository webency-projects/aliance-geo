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
    data = json.loads(msg.value())

    coordinates = data.get("coordinates", [])
    adjusted_coords, crosses_antimeridian = adjust_coordinates(coordinates)
    response = {
        "adjusted_coordinates": adjusted_coords,
        "crosses_antimeridian": crosses_antimeridian
    }
    return response
