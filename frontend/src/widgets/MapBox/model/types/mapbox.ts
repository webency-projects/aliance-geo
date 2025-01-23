import {Feature, FeatureCollection} from "geojson";

type searchData = {
    name: string,
    coords: [number, number],
}

export interface MapBoxSchema {
    data: FeatureCollection
    isLoading: boolean
    error?: string | undefined
    feature?: Feature
    searchData?: searchData[]
    center: [number, number]
}
