import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CategoryNames, IProductBasket} from "../../Types/Catalog";
import axios from "axios";
import {OrderRequestForm} from "../../Types/OrderForm";


const AddToLocalStorage = (data:IProductBasket[]) => {
    let parseProducts = JSON.stringify(data)
    localStorage.setItem('Basket', parseProducts)
}

const getAllPrice = (data: IProductBasket[]) => {
    let allPrice = 0
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        let priceCount = 0
        if (data[i].count > 1) {
            priceCount += data[i].price * data[i].count
            allPrice += Number(sum + priceCount)
        } else if (data[i].count < 1) {
            priceCount -= data[i].price * data[i].count
            allPrice -= Number(sum + priceCount)
        }
        else {
            allPrice += Number(sum + data[i].price)
        }
    }
    return allPrice
}

const parseBasket = () => {
    const stringBasket = localStorage.getItem('Basket')
    if (!stringBasket) {
        return []
    }
    return JSON.parse(stringBasket)
}

export const SendFormOrder = createAsyncThunk<boolean, OrderRequestForm>(
    'send-form-order', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:7744/send_order', data)
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

interface BasketType {
    isError: boolean,
    isLoading: boolean,
    isRequest: boolean,
    isProduct: IProductBasket
    products: IProductBasket[],
    allPrice: number
}

const initialState:BasketType = {
    isError: false,
    isLoading: false,
    isRequest: false,
    products: parseBasket(),
    isProduct: {
      price: 0,
      descProduct: '',
      kcal: 0,
      count: 0,
        id: 0,
        weight: '',
        name: '',
        image: '',
        typeProduct: CategoryNames.BURGERS,
      compaund: {
          ing1: '',
          ing2: '',
          ing3: '',
          ing4: '',
          ing5: '',
          ing6: '',
          ing7: '',
          ing8: '',

      },

    },
    allPrice: getAllPrice(parseBasket())
}

interface ActionBasket<T> {
    type: any,
    payload: T
}

const BasketSlice = createSlice({
    name: 'BasketSlice',
    initialState: initialState,
    reducers: {
        addToBasket (state, action:ActionBasket<IProductBasket>) {
            if (state.products.length === 0) {
                state.products = [...state.products, action.payload]
                AddToLocalStorage(state.products)
                state.allPrice = getAllPrice(state.products)
            } else {
                state.isError = false
                for (let i = 0; i < state.products.length; i++) {
                    if (state.products[i].id === action.payload.id) {
                        state.isError = true
                    }
                }
                if (state.isError === false) {
                    state.products = [...state.products, action.payload]
                    AddToLocalStorage(state.products)
                    state.isError = false
                    state.allPrice = getAllPrice(state.products)
                }
            }
        },
        productCountIncrement (state, action:ActionBasket<IProductBasket>) {
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].id === action.payload.id) {
                    state.products[i].count = state.products[i].count + 1
                    state.allPrice = getAllPrice(state.products)
                    localStorage.removeItem('Basket')
                    AddToLocalStorage(state.products)
                    //  state.isProduct.count = state.products[i].count УВЕЛИЧИВАЕТ НА ОДНУ СЧЕТЧИК КОНКРЕТНОГО ПРОДУКТА
                    state.isProduct.count = state.products[i].count
                }
            }
        },
        productCountDecrement (state, action:ActionBasket<IProductBasket>) {
            localStorage.removeItem('Basket')
            const nextCount = action.payload.count - 1
            if (nextCount === 0) {
                const newProductBasket = state.products.filter(i => i.id !== action.payload.id)
                state.products = newProductBasket
                //  state.isProduct.count = 0 УСТАНАВЛИВАЕТ КОЛ-ВО ПРОДУКТА 0 ЕСЛИ СЛЕДУЮЩЕЕ ЧИСЛО 0
                state.isProduct.count = 0
                state.allPrice = getAllPrice(state.products)
                AddToLocalStorage(newProductBasket)
            } else {
                for (let i = 0; i < state.products.length; i++) {
                    if (state.products[i].id === action.payload.id) {
                        state.products[i].count = nextCount
                        //  state.isProduct.count = state.products[i].count ПОНИЖАЕТ НА ОДНУ СЧЕТЧИК КОНКРЕТНОГО ПРОДУКТА
                        state.isProduct.count = state.products[i].count
                        state.allPrice = getAllPrice(state.products)
                        AddToLocalStorage(state.products)
                    }
                }
            }
        },
        setProduct (state, action) {
            let countProduct = 0
            state.products.map(i => {
                if (i.id === action.payload.id) {
                    countProduct = i.count
                }
            })
            state.isProduct = {...action.payload, count: countProduct}
        },
        changeStateRequest (state) {
            state.isRequest = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SendFormOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(SendFormOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isRequest = true
            })
            .addCase(SendFormOrder.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            });
    }
})

export const {addToBasket, changeStateRequest, productCountIncrement, setProduct, productCountDecrement} = BasketSlice.actions

export default BasketSlice.reducer