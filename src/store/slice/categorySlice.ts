// interface category {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   rating: number;
//   image: string;
//   isNew?: boolean;
//   isOnSale?: boolean;
//   freeShipping?: boolean;
// }

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryState {
    categories: string[];
    categoryLoad: boolean;
    error: string | null;

}

const initialState: CategoryState = {
    categories: [],
    categoryLoad: false,
    error: null,
}
 //get category listing is a function that fetches category listing from the backend and it is called by categorySlice
export const getCategoryListing = createAsyncThunk( 'category/fetchCategoryListing',
  async (slug: string) => {
    try {
      const { data } = await axios.get(`/api/category/slug/${slug}`);
      return data.data;
    } catch (error) {
      console.error("Error fetching category listing:", error);
      const err = error as any;
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    clearCategory(state) {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryListing.pending, (state) => {
        state.categoryLoad = true;
        state.error = null;
      })
      .addCase(getCategoryListing.fulfilled, (state, action) => {
        state.categoryLoad = false;
        state.categories = action.payload as any | null;
      })
      .addCase(getCategoryListing.rejected, (state, action) => {
        state.categoryLoad = false;
        state.error = action.payload as string | null;
      });
  },
});

export const { clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
