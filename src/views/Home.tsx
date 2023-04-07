import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { increment, incrementByAmount, getUserInfoAsync } from "../store/counterReducer";
import { get } from '../service/login';

const Home = () => {

  const count = useSelector((state: RootState) => {
    console.log(state);
    
    return state.counter.value
  });
  const dispatch: AppDispatch = useDispatch();

  const onLog = async () => {
    const data = await get();
    console.log(data);
  }

  return (
    <div>
      homeffff
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch(increment())
        }}
      >
        修改store1
      </button>
      <button
        onClick={() => {
          dispatch(incrementByAmount('修改'))
        }}
      >
        修改store2
      </button>
      <button
        onClick={() => {
          dispatch(getUserInfoAsync())
        }}
      >
        异步修改store
      </button>
      <button
        onClick={() => {
          onLog()
        }}
      >
        获取接口
      </button>
    </div>
  );
};

export default Home;