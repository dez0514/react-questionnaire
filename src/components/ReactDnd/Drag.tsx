import { memo } from 'react';
import { useDrag } from 'react-dnd';
// 只能拖
export default memo(function Box({ accept, info, children, style = {} }: any) {
	const [{ opacity }, drag] = useDrag({
    type: accept,
		item: { ...info },
		collect: (monitor: any) => ({
			opacity: monitor.isDragging() ? 0.4 : 1
		})
	});
	return (
    <div ref={drag} style={{ ...style, opacity }}>
      { children }
    </div>
  )
})