import {createAsyncThunk} from "@reduxjs/toolkit";
import {FeatureCollection, Polygon} from "geojson";
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema.ts";

export const fetchIntersectionData = createAsyncThunk<FeatureCollection<Polygon>, void, ThunkConfig<string>>(
    'mapbox/fetchIntersectionData',
    async (_, thunkApi) => {
        const {extra, rejectWithValue} = thunkApi;
        try {
            const response = await extra.api.get<FeatureCollection<Polygon>>('/api/intersections/');
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
