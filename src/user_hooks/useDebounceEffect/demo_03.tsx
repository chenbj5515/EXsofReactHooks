import React, { useState, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

function useDebounceEffect(effect: { (): void; (): void; }, deps: React.DependencyList | undefined, options: { wait: any; }) {
    const debouncedEffect = useRef<Function>(() => {});
    const wait = options?.wait ?? 1000;
    useEffect(() => {
        debouncedEffect.current = debounce(() => {
            effect();
        }, wait);
    }, []);
    useEffect(() => {
        debouncedEffect.current();
    }, deps);
}
export default () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);
  useDebounceEffect(
    () => {
      setRecords((val) => [...val, value]);
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
