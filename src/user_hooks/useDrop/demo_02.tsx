/**
 * title: Default usage
 * desc: The drop area can accept files, uri, text or one of the boxes below.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */

import React, { useState } from 'react';

type DragProps = (data: any) => {
    key: any;
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
} 

interface IConfig {
    onDragStart?: (data: any, e: React.DragEvent) => void;
    onDragEnd?: (data: any, e: React.DragEvent) => void;
}

interface DragState {
    isDragging: boolean;
}

interface DropProps {
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: () => void;
}

interface DropState {
    isHovering: boolean;
}

function useDrag(config: IConfig): [DragProps, DragState] {
    const [isDragging, setisDragging] = useState(false);
    const getDragProps = data => {
        return {
            key: JSON.stringify(data),
            draggable: true,
            onDragStart: (e: React.DragEvent) => {
                if (config && config.onDragStart) {
                    config.onDragStart(data, e);
                }
                setisDragging(data || true);
                e.dataTransfer.setData('custom', JSON.stringify(data));
            },
            onDragEnd: (e: React.DragEvent) => {
                if (config && config.onDragEnd) {
                    config.onDragEnd(data, e);
                }
                setisDragging(false);
            }
        }
    }
    return [getDragProps, { isDragging }];
}

function useDrop(cb): [DropProps, DropState] {
    const [isHovering, setIsHovering] = useState(false);
    const props = {
        onDragOver: (e: React.DragEvent) => {
            e.preventDefault();
        },
        onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            cb(e.dataTransfer.getData('custom'));
        },
        onDragEnter: (e: React.DragEvent) => {
            e.preventDefault();
            setIsHovering(true);
        },
        onDragLeave: () => {
            setIsHovering(false);
        },
    }
    return [props, { isHovering }]
}

export default () => {
  const [getDragProps, { isDragging }] = useDrag({});
  const [props, { isHovering }] = useDrop(data => {
      console.log(data, '拖拽元素的信息')
  });
  return (
    <div>
      <div style={{ border: '1px dashed #e8e8e8', width: '800px', height: '166px', lineHeight: '166px', padding: 0, textAlign: 'center' }} {...props}>
        {isHovering ? 'release here' : 'drop here'}
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        {Array.from(Array(5)).map((e, i) => (
          <div
            {...getDragProps(`box${i}`)}
            style={{
              border: '1px solid #e8e8e8',
              padding: 16,
              width: 80,
              textAlign: 'center',
              marginRight: 16,
            }}
          >
            box{i}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>{isDragging ? <>dragging {isDragging}</> : 'not dragging'}</div>
    </div>
  );
};
