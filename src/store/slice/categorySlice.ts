import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  banner: string[];
}

interface Pagination {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface CategoryState {
    category: Category | null;
    products: Product[];
    pagination: Pagination | null;
    categoryLoad: boolean;
    error: string | null;
    subCategory: any[];

}

const initialState: CategoryState = {
    category: null,
    products: [],
    pagination: null,
    categoryLoad: false,
    error: null,
    subCategory: [],
}

export const getCategoryListing = createAsyncThunk( 'category/fetchCategoryListing',
  async ({ slug, page = 1, limit = 12 }: { slug: string; page?: number; limit?: number }) => {
    try {
      const { data } = await axios.get(`/api/category/slug/${slug}?page=${page}&limit=${limit}`);
      return data.data;
    } catch (error: any) {
      console.error("Error fetching category listing:", error);
    }
  }
);

export const getSubCategoryListing = createAsyncThunk( "category/getSubCategoryListing",
  async ({ parentId }: { parentId: number }) => {
    try {
      const { data } = await axios.get(`/api/category/ParentCategoryId/${parentId}`);
      return data.data ;
    } catch (error: any) {
      console.error("Error fetching subcategories:", error);
    }
  }
);


const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    clearCategory(state) {
      state.category = null;
      state.products = [];
      state.pagination = null;
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
        state.category = action.payload.category;
        state.products = action.payload as any | null;
      })
      .addCase(getCategoryListing.rejected, (state, action) => {
        state.categoryLoad = false;
        state.error = action.payload as string | null;
      }).addCase(getSubCategoryListing.fulfilled,
              (state, action ) => {
                if (action.payload) {
                  state.subCategory = action.payload;
                }
              }
            );
  },
});

export const { clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
