import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCurrentFeature} from "../selectors/MapDataSelectors.ts";



export const addMapData = createAsyncThunk(
    'mapbox/addMapData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const feature = getCurrentFeature(getState());
        try {
            const response = await extra.api.post("/api/polygons/", feature)
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue("Ошибка сохранения полигона");
        }
    }
)
