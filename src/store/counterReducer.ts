import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  token: string
  value: string | any
  error: string | undefined
};

const initialState: CounterState = {
  token: '',
  value: 'store',
  error: ''
}

export const counterSlice = createSlice({
  name: 'counter', // 名称
  initialState, // 定义原始值
  reducers: { // //定义操作 value 值的方法
    settoken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    increment: state => {
      state.value = 'new store'
    },
    incrementByAmount: (state, action: PayloadAction<string>) => {
      state.value += action.payload
    }
  },
  extraReducers(builder) { // 异步修改数据
    builder
    .addCase(getUserInfoAsync.pending, state => { // 请求前
      console.log(state);
    })
    .addCase(getUserInfoAsync.fulfilled,
      (state, action) => { // 请求后
        console.log(state,  action.payload);
        state.value = action.payload;
    })
    .addCase(getUserInfoAsync.rejected, // 请求输错
      (state, action) => {
        state.error = action.error.message
    })
  }
});

export const getUserInfoAsync = createAsyncThunk('getUserInfoAsync', async () => {
  const res = await new Promise(resolve => {
    setTimeout(() => {
      return resolve('1111')
    }, 2000)
  });
  return res;
});

export const {settoken, increment, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;