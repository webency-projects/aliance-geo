import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCurrentFeature} from "../selectors/MapDataSelectors.ts";
import {StateSchema} from "app/providers/StoreProvider/config/StateSchema.ts";



export const addMapData = createAsyncThunk(
    'mapbox/addMapData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const feature = getCurrentFeature(getState() as StateSchema);
        try {
            // @ts-ignore
            const response = await extra.api.post("/api/polygons/", feature)
            if (!response.data) {
                throw new Error("Нет данных");
            }
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue("Ошибка сохранения полигона");
        }
    }
)
