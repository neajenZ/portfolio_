import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CategoryNames, IProduct} from "../../Types/Catalog";
import axios from "axios";



export const fetchBurgers = createAsyncThunk<IProduct[], undefined>(
    'fetchBurgers',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get<IProduct[]>(`http://localhost:7744/burgers`)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

interface ProductsArray {
    burgers: IProduct[],
    zakuski: IProduct[],
    hotDogs: IProduct[],
    combo: IProduct[],
    shawerma: IProduct[],
    pizza: IProduct[],
    wok: IProduct[],
    deserts: IProduct[],
    souces: IProduct[]
}

interface StateType {
    isLoading: boolean,
    error: {
        isError: boolean,
        message: string
    },
    products: ProductsArray
}

const initialState:StateType = {
    isLoading: false,
    error: {
        isError: false,
        message: '',
    },
    products: {
        burgers: [],
        zakuski: [],
        hotDogs: [],
        combo: [],
        shawerma: [],
        pizza: [],
        wok: [],
        deserts: [],
        souces: []
    }
}

const CatalogSlice = createSlice({
    name: 'BasketSlice',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBurgers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchBurgers.fulfilled, (state, action) => {
                state.isLoading = false
                const products:ProductsArray = {
                    burgers: [],
                    zakuski: [],
                    hotDogs: [],
                    combo: [],
                    shawerma: [],
                    pizza: [],
                    wok: [],
                    deserts: [],
                    souces: []
                }
                action.payload.map(product => {
                    switch (product.typeProduct) {
                        case CategoryNames.BURGERS:
                            products.burgers.push(product)
                            break;
                        case CategoryNames.ZAKUSKI:
                            products.zakuski.push(product)
                            break;
                        case CategoryNames.HOT_DOGS:
                            products.hotDogs.push(product)
                            break;
                        case CategoryNames.COMBO:
                            products.combo.push(product)
                            break;
                        case CategoryNames.PIZZA:
                            products.pizza.push(product)
                            break;
                        case CategoryNames.SHAURMA:
                            products.shawerma.push(product)
                            break;
                        case CategoryNames.DESERTS:
                            products.deserts.push(product)
                            break;
                        case CategoryNames.SOUCES:
                            products.souces.push(product)
                            break;
                    }
                })
                state.products = products
            })
            .addCase(fetchBurgers.rejected, (state) => {
                state.isLoading = false
                state.error.isError = true
            });
    }
})

export default CatalogSlice.reducer