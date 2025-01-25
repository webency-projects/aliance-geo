import {createAsyncThunk} from "@reduxjs/toolkit";
import {FeatureCollection} from "geojson";
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema.ts";

export const fetchIntersectionData = createAsyncThunk<FeatureCollection, void, ThunkConfig<string>>(
    'mapbox/fetchIntersectionData',
    async (_, thunkApi) => {
        const {extra, rejectWithValue} = thunkApi;
        try {
            const response = await extra.api.get<FeatureCollection>('/api/intersections/');
            if (!response.data) {
                throw new Error("нет данных");
            }
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Не удалось загрузить данные");
        }
    }
)
