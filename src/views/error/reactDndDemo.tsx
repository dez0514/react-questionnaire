import DndContainer from "@/components/ReactDnd/DndContainer";
// import BoxDrag from "@/components/ReactDnd/Drag";
import BoxDrop from "@/components/ReactDnd/Drop";
import { useState } from 'react'
import { produce } from "immer";
const style = {
  width: 400,
  marginBottom: '10px'
}
const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
]
function Test2() {
  const [cards, setCards] = useState(ITEMS)
  const handleDrop = (data: any, index: any) => {
    // console.log('handledrop===', data, index)
    const dropData = produce(cards, draft => {
      const idx = draft.findIndex(f => f.id === data.id)
      if(idx > -1) {
        draft[idx] = draft[index]
        draft[index] = data
      }
    })
    setCards(dropData)
  }
  return (
    <DndContainer>
      <div>
        {cards.map((card, index) => (
          <BoxDrop key={card.id} style={{ ...style }} accept="card" info={card} onDrop={(item: any) => handleDrop(item, index)}>
            {/* <BoxDrag id={card.id} accept="card" info={card}> */}
              <div style={{ border: '1px solid #333'}}>
                <div>id: {card.id}</div>
                <div>text: {card.text}</div>
              </div>
            {/* </BoxDrag> */}
          </BoxDrop>
        ))}
      </div>
    </DndContainer>
  )
}

export default Test2