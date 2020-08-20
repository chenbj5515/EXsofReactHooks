/**
 * title: Default usage
 * desc: The drop area can accept files, uri, text or one of the boxes below.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */

import React, { useState } from 'react';
import { useDrop, useDrag } from 'ahooks';
import './demo_01.css';

export default () => {
  function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
    console.log(event.dataTransfer, event.target.id);
    document.getElementById("demo").innerHTML = "开始拖动 p 元素";
  }
  function allowDrop(event) {
    console.log('over===')
      // event.preventDefault();
  }
  function drop(event) {
    // console.log('drag')
      event.preventDefault();
      var data = event.dataTransfer.getData("Text");
      event.target.appendChild(document.getElementById(data));
      document.getElementById("demo").innerHTML = " p 元素已被拖动";
  }
  return (
    <div>
      <p>在两个矩形框中来回拖动 p 元素:</p>
      <div className="droptarget" onDrop={() => drop(event)} onDragOver={() => allowDrop(event)}>
        <p onDragStart={() => dragStart(event)} draggable="true" id="dragtarget">拖动我!</p>
      </div>
      <div className="droptarget" onDrop={() => drop(event)} onDragOver={() => allowDrop(event)}></div>
      <p style={{clear: 'both'}}><strong>注意：</strong>Internet Explorer 8 及更早 IE 版本或 Safari 5.1 及更早版本的浏览器不支持 drag 事件。</p>
      <p id="demo"></p>
    </div>
  );
};
