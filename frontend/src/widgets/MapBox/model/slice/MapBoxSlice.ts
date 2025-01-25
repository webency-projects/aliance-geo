import {createSlice} from "@reduxjs/toolkit";
import {MapBoxSchema} from "../types/mapbox.ts";
import {fetchMapData} from "../services/fetchMapData.ts";
import {addMapData} from "widgets/MapBox/model/services/addMapData.ts";
import {FeatureCollection} from "geojson";
import {fetchIntersectionData} from "widgets/MapBox/model/services/fetchIntersectionData.ts";


const initialState: MapBoxSchema = {
    isLoading: false,
    error: undefined,
    data: {} as FeatureCollection,
    intersections: {} as FeatureCollection,
    feature: undefined,
    searchData: [],
    center: [0, 0]
}


export const MapBoxSlice = createSlice({
    name: 'mapbox',
    initialState,
    reducers: {
        setCurrentFeature: (state, action) => {
            state.feature = action.payload;
        },
        setPropertiesName: (state, action) => {
            state.feature = {
                ...state.feature,
                properties: action.payload,
            };
        },
        setCenter: (state, action) => {
            state.center = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMapData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMapData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.searchData = action.payload.features.reduce((acc, curr) => {
                    const obj = {
                        name: curr?.properties?.name,
                        coords: curr.geometry.coordinates.flat()[0]
                    }
                    return [...acc, obj];
                },[])
            })
            .addCase(fetchMapData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })

            .addCase(fetchIntersectionData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchIntersectionData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.intersections = action.payload;
            })
            .addCase(fetchIntersectionData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })

            .addCase(addMapData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addMapData.fulfilled, (state) => {
                state.isLoading = false;
                state.feature = undefined;
            })
            .addCase(addMapData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string;
            })
    }
})

export const {actions: mapActions} = MapBoxSlice;
export const {reducer: mapReducer} = MapBoxSlice;
