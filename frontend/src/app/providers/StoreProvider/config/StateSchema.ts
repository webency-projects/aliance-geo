import AxiosInstance = Axios.AxiosInstance;
import {MapBoxSchema} from "widgets/MapBox/model/types/mapbox.ts";



export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface StateSchema {
    map: MapBoxSchema
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
