import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string[];
}
interface ProductState {
    products: Product[];
    productLoad: boolean;
    error: string | null;
}
const initialState: ProductState = {
    products: [],
    productLoad: false,
    error: null,
}
export const getProductListing = createAsyncThunk( 'product/fetchProductListing', 
    async ({ slug }: { slug: string }) => {
        try {
            const { data } = await axios.get(`/api/products/slug/${slug}`);
            console.log("Fetched product listing:", data.data);
            return data.data;
        } catch (error: any) {
            console.error("Error fetching product listing:", error);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProduct(state) {
        state.products = [];
    },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductListing.pending, (state) => {
            state.productLoad = true;
            state.error = null;
        })
        .addCase(getProductListing.fulfilled, (state, action) => {
            state.productLoad = false;
            state.products = action.payload || [];
        })
        .addCase(getProductListing.rejected, (state, action) => {
            state.productLoad = false;
            state.error = action.error.message || 'Failed to fetch products';
        });
    }
});
export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
