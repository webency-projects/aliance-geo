import {Feature, FeatureCollection} from "geojson";



export interface MapBoxSchema {
    data: FeatureCollection
    isLoading: boolean
    error?: string | undefined
    feature?: Feature
}
