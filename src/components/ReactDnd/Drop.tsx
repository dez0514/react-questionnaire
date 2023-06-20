import { memo } from 'react';
import { useDrop, useDrag } from 'react-dnd';
// 既能放 也能拖
export default memo(({ accept, info, onDrop, children, style = {} }: any) => {
  const [, drop] = useDrop({
		accept,
		drop: onDrop,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	});
	const [{ opacity }, drag] = useDrag({
    type: accept,
		item: { ...info  },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.4 : 1
		})
	});
  return (
    <div ref={drop} style={{ ...style, opacity }}>
      <div ref={drag}>
        { children }
      </div>
    </div>
  )
})