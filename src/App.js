import { inputs } from './data/inputs'
import React, { useState } from 'react'
import { convertDate, sortsDates, findOverlaps, findSlotWidth, findSlotPosition, findWidthRatio } from './utils/utils'

function parseSlots(slots) {
  convertDate(slots)
  sortsDates(slots)

  slots.forEach((slot, index) => {
    slot.overlapWith = findOverlaps(slots, index)
    slot.width = findSlotWidth(slots, index)
    slot.position = findSlotPosition(slots, index)
    slot.widthRatio = findWidthRatio(slots, index)
  })
  return slots
}

export default function App() {
  const [slots] = useState(parseSlots(inputs))

  return (
    <div className="p-3">
      <h1 className="text-center title font-semibold text-xl p-2">
        React Rendering Event Senior
      </h1>
      <div className="border border-gray-300 ml-4 py-2 rounded-sm relative h-[1800px] bg-slate-50">
        {slots.map((el) => {
          return (
            <div
              key={el.id}
              style={{
                height: el.duration * 1 ,
                top: (el.timeStamp - 530) * 1,
                left: el.width === 1 ? 0 : (el.position / el.width) * 100 + '%',
                right: el.width === 1 && 0,
                width: (el.widthRatio / el.width) * 100 + '%',
                fontSize:'7px'
              }}
              className="absolute bg-cyan-200 border border-cyan-500 rounded"
            >
              {el.start + ' - ' + el.end}
            </div>
          )
        })}
      </div>
    </div>
  )
}
