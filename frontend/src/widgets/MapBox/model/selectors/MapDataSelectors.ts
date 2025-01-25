import {StateSchema} from "app/providers/StoreProvider/config/StateSchema.ts";

export const getMapData = (state: StateSchema) => state.map?.data;
export const getIntersectionData = (state: StateSchema) => state.map?.intersections;
export const getMapError = (state: StateSchema) => state.map.error;
export const getMapIsLoading = (state: StateSchema) => state.map.isLoading;

export const getCurrentFeature = (state: StateSchema) => state.map.feature;

export const getSearchData = (state: StateSchema) => state.map.searchData;

export const getMapCenter = (state: StateSchema) => state.map.center;
