import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type PropsType = {
  children: JSX.Element | JSX.Element[]
}
function DndContainer({ children }: PropsType) {
  return (
    <DndProvider backend={HTML5Backend}>
      { children }
    </DndProvider>

  )
}
export default DndContainer