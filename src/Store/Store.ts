import {configureStore} from "@reduxjs/toolkit";
import BasketSlice from './Slice/Basket'
import CatalogSlice from './Slice/Catalog'
export const Store = configureStore({
    reducer: {
        basket: BasketSlice,
        catalog: CatalogSlice
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch