import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';
import debounce from 'lodash.debounce';

function useDebounceEffect(effect: Function, deps: React.DependencyList | undefined, options: {wait: number}) {
    const debouncedEffectRef = useRef<Function>(() => {});
    const latestEffectRef = useRef<Function>(() => {});
    latestEffectRef.current = effect; 
    const wait = options?.wait ?? 1000;
    useEffect(() => {
        debouncedEffectRef.current = debounce(() => {
            latestEffectRef.current();
        }, wait);
    }, []);
    useEffect(() => {
        debouncedEffectRef.current();
    }, deps);
}
export default () => {
  const [value, setValue] = useState('hello');
  const reducer = (state: any, action: { type: string; }) => {
    switch (action.type) {
      case 'add':
        return [...state, value]
      default: 
        return [...state, value]
    }
  }
  const [records, dispatch] = useReducer(reducer, []);
  // const [records, setRecords] = useState<string[]>([]);
  useDebounceEffect(
    () => {
      dispatch({type: 'assign'});
      // setRecords((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    },
  );
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};
