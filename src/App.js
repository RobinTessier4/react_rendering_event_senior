import { inputs } from './data/inputs'
import React, { useState } from 'react'
import { convertDate, sortsDates, isOverLapping } from './utils/utils'

function findOverlaps(slots, index) {
  //* fill an array with indexes of overlapping elements
  let overlapWith = []
  for (let i = 0; i < slots.length; i++) {
    if (i !== index && isOverLapping(slots[index], slots[i])) {
      overlapWith.push(i)
    }
  }
  return overlapWith
}

function findSlotWidth(slots, index) {
  //* first assume that a slot A overlapping with slot B and C will take 1/3 of window width
  //* then compare slots B and C to see if they overlap, if they don't then A will take 1/2 of window width
  let width = slots[index].overlapWith.length + 1
  if (
    slots[index].overlapWith.length &&
    slots[slots[index].overlapWith[0]].overlapWith
  ) {
    width = slots[slots[index].overlapWith[0]].width
  }
  return width
}

function findSlotPosition(slots, index) {
  //* find the horizontal position for the element
  //* then divide by the width property like so : 0/3, 1/3 and 2/3
  let position = 0
  for (let i = 0; i < slots[index].overlapWith.length; i++) {
    if (
      typeof slots[slots[index].overlapWith[i]].position !== 'undefined' &&
      slots[slots[index].overlapWith[i]].position < slots[index].width - 1
    ) {
      position++
    }
  }
  return position
}

function findWidthRatio(slots, index) {
  //* if an element doesnt completely fill the space horizontally change his ratio
  //* for example from 1/3 to 2/3 of the screen
  let widthRatio = 1
  if (slots[index].overlapWith.length < slots[index].width - 1) {
    widthRatio = slots[index].width - slots[index].overlapWith.length
  }
  return widthRatio
}

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
      <div className="border border-gray-300 ml-4 py-2 rounded-sm relative h-[1800px]">
        {slots.map((el) => {
          return (
            <div
              key={el.id}
              style={{
                height: el.duration * 2.5,
                top: (el.timeStamp - 500) * 2.5,
                left: el.width === 1 ? 0 : (el.position / el.width) * 100 + '%',
                right: el.width === 1 && 0,
                width: (el.widthRatio / el.width) * 100 + '%',
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
