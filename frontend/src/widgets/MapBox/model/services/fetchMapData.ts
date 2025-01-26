import {createAsyncThunk} from "@reduxjs/toolkit";
import {FeatureCollection, Polygon} from "geojson";
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema.ts";

export const fetchMapData = createAsyncThunk<FeatureCollection<Polygon>, void, ThunkConfig<string>>(
    'mapbox/fetchMapData',
    async (_, thunkApi) => {
        const {extra, rejectWithValue} = thunkApi;
        try {
            const response = await extra.api.get<FeatureCollection<Polygon>>('/api/polygons/');
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
