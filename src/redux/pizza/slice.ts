import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { Pizza, PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
  products: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Pizza[]>) {
      state.products = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.products = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.products = [];
    });
  },
});

export const { setProducts } = pizzaSlice.actions;

export default pizzaSlice.reducer;
