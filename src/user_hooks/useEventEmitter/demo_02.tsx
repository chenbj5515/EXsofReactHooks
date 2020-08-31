/**
 * title: Parent component shares a event
 * desc: The parent component creates a focus$ event emitter, and passes it to its children. When calling focus$.emit in MessageBox, InputBox will get notified.
 *
 * title.zh-CN: 父组件向子组件共享事件
 * desc.zh-CN: 父组件创建了一个 focus$ 事件，并且将它传递给了两个子组件。在 MessageBox 中调用 focus$.emit ，InputBox 组件就可以收到通知。
 */

import React, { useRef, useState } from 'react';

function useEventEmitter() {
    let callback: (() => void) | null = null;
    const useSubscription = (cb: (() => void) | null) => {
        callback = cb;
    }
    return {
        emit: () => {
          callback && callback();
        },
        useSubscription
    }
}

// let MessageBox = function ;
let MessageBox = React.memo((props: any) => {
  console.log('rerender');
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>You received a message</p>
      <button
        type="button"
        onClick={() => {
          props.focus$.emit();
        }}
      >
        Reply
      </button>
    </div>
  );
});

const InputBox = function (props: any) {
  const inputRef = useRef<any>();
  props.focus$.useSubscription(() => {
    inputRef.current.focus();
  });
  return (
    <input ref={inputRef} placeholder="Enter reply" style={{ width: '100%', padding: '4px' }} />
  );
};

export default function () {
  const focus$ = useEventEmitter();
  const [count, setCount] = useState(0);
  return (
    <>
        <MessageBox focus$={focus$} />
        <InputBox focus$={focus$} />
        <div onClick={() => setCount(count => count + 1)}>点我增加{count}</div>
    </>
  );
}
