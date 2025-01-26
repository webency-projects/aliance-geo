import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {mapReducer} from "widgets/MapBox";
import {$api} from "shared/api/api.ts";
import {ThunkExtraArg} from "./StateSchema.ts";



const extraArg: ThunkExtraArg = {
    api: $api,
};


const rootReducer = combineReducers({
    map: mapReducer
})


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: extraArg
        }
    })
})

export default store
