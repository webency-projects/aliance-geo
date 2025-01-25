import {Feature, FeatureCollection, Polygon} from "geojson";

type searchData = {
    name: string,
    coords: [number, number],
}

export interface MapBoxSchema {
    data: FeatureCollection;
    intersections: FeatureCollection;
    isLoading: boolean;
    error?: string | undefined;
    feature?: Feature<Polygon>;
    searchData?: searchData[];
    center: [number, number];
}
