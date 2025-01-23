import {createSlice} from "@reduxjs/toolkit";
import {MapBoxSchema} from "../types/mapbox.ts";
import {fetchMapData} from "../services/fetchMapData.ts";
import {addMapData} from "widgets/MapBox/model/services/addMapData.ts";
import {FeatureCollection} from "geojson";


const initialState: MapBoxSchema = {
    isLoading: false,
    error: undefined,
    data: {} as FeatureCollection,
    feature: undefined,
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
            })
            .addCase(fetchMapData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })
            .addCase(addMapData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addMapData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.features.push(action.payload);
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
