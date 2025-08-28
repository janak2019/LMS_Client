import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
  name: "book",
    initialState: {
        loading: false,
        error: null,    
        books: [],
    },
    reducers: {
        fetchBooksRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },  
});