import { inputs } from './inputs'
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
  for (let i = 0; i < slots[index].overlapWith.length; i++) {
    if (
      i < slots[index].overlapWith.length - 1 &&
      !isOverLapping(
        slots[slots[index].overlapWith[i]],
        slots[slots[index].overlapWith[i + 1]],
      )
    ) {
      width--
    }
  }
  return width
}

function findSlotPosition(slots, index) {
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

function findWidthRatio(slots, index) {}

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
  const [slots] = useState(parseSlots(inputs.slice(0, 10)))

  return (
    <div className="p-4">
      <div className="border border-gray-300 ml-4 py-2 rounded-sm relative h-[1800px]">
        {slots.map((el) => {
          console.log(el)
          return (
            <div
              key={el.id}
              style={{
                height: el.duration * 2.5,
                top: (el.timeStamp - 500) * 2.5,
                left: el.width === 1 ? 0 : (el.position / el.width) * 100 + '%',
                right: el.width === 1 && 0,
                width: (1 / el.width) * 100 + '%',
              }}
              className="absolute bg-cyan-200 border border-cyan-500 rounded"
            >
              {el.start + ' - ' + el.end + ' ' + el.width}
            </div>
          )
        })}
      </div>
    </div>
  )
}
