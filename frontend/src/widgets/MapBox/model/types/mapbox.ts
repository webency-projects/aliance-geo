import {Feature, FeatureCollection, Polygon} from "geojson";
import {LatLngBoundsLiteral} from "leaflet";

type searchData = {
    name: string,
    coords: [number, number],
}

export interface MapBoxSchema {
    data: FeatureCollection<Polygon>;
    intersections: FeatureCollection<Polygon>;
    isLoading: boolean;
    error?: string | undefined;
    feature?: Feature<Polygon>;
    searchData?: searchData[];
    center: LatLngBoundsLiteral | null;
}
