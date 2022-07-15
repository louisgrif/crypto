import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ENDPOINT
// https://sochain.com//api/v2/get_price/*abbreviation_here*/*unit_of_currency_here*
export const fetchPrice = createAsyncThunk(
  'form/price',
  async({coin, currency}) => {
    const response = await fetch(
      `https://sochain.com//api/v2/get_price/${coin}/${currency}`
    );
    const result = await response.json();
    return result.data;
  }
)

export const formSlice = createSlice({
  name: "form",
  initialState: {
    results: {},
    loading: false,
    time: "",
    formData: {
      coin: "",
      currency: "",
    },
  },
  reducers: {
    setCoin: (state, action) => {
      state.formData.coin = action.payload;
    },
    setCurrency: (state, action) => {
      state.formData.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrice.pending, state => {
      state.results = {};
      state.loading = true;
      const date = new Date().toLocaleString();
      state.time = date.substring(date.indexOf(",") + 1, date.indexOf("M") + 1);
    })
    builder.addCase(fetchPrice.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    })
    builder.addCase(fetchPrice.rejected, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    })
  }
  
});

// Export your action creators (which match reducer names) here
export const { setCoin, setCurrency } = formSlice.actions;

export default formSlice.reducer;
