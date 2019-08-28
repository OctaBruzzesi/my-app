import React, {useState} from 'react';
import Counter from './Counter';

const CounterContainer = () => {
  const [value, count] = useState(0);
  const onDeduct = () => {
    count(value - 1);
  };
  const onAdd = () => {
    count(value + 1);
  };
  return <Counter value={value} onDeduct={onDeduct} onAdd={onAdd} />;
};

export default CounterContainer;
