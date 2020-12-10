import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../store/hooks';

const Counter = observer(() => {
  const store = useStores(); // 获取store

  const { counterStore, themeStore } = store;

  const handleIncrement = () => {
    counterStore.increment();
  };
  const handleDecrement = () => {
    counterStore.decrement();
  };
  console.log(counterStore)

  return (
    <div>
      <p>count: {counterStore.count}</p>
      <p>theme: {themeStore.theme}</p>
      <button onClick={handleIncrement}>add</button>
      <button onClick={handleDecrement}>dec</button>
    </div>
  )
})

export default Counter;
