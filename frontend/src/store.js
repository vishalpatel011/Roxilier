import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice"; // Import your reducer

const store = configureStore({
  reducer: {
    transactions: transactionsReducer, // Add your reducers here
  },
});

export default store;
