import './App.css'
import { inputs } from './inputs'
import React, { useState } from 'react'

function convertDate(slots) {
  //calculate end time
  slots.forEach((slot) => {
    let splitStart = slot.start.split(":")
    let hourAdd = Math.round(slot.duration / 60)
    let minAdd = slot.duration - (hourAdd * 60)
    slot.end = parseInt(splitStart[0]) + hourAdd + ":" + (parseInt(splitStart[1]) + minAdd === 0 ? '00' : parseInt(splitStart[1]) + minAdd)
  })
  return slots
}

function sortsDates(slots) {
  //sorts slots by duration and starting time
  slots.sort((a, b) => (a.duration < b.duration) ? 1 : -1)
  slots.sort((a, b) => (a.start > b.start) ? 1 : -1)
  return slots
}

function findSlotWidth(slots, index) {
  let sharedLine = 0
  for (let i = index; i < slots.length; i++) {
    if (i < slots.length - 1 && slots[i].end < slots[i + 1].start)
      sharedLine++
  }
  return sharedLine
}

function parseSlots(slots) {
  convertDate(slots)
  sortsDates(slots)

  slots.forEach((slot, index) => {
    // slot.width = findSlotWidth(slots, index)
    // slot.width = findSlotWidth(slots, index)
    slot.width = 1
  })

  for (let i = 0; i < slots.length; i++) {
    if (i < slots.length - 1 && slots[i].end > slots[i + 1].start && slots[i].end < slots[i + 1].end) {
      slots[i].width++
    }
  }
  console.log(slots)
  // console.log(newSlots)
  return slots
}

export default function App() {
  const [slots] = useState(parseSlots(inputs.slice(0, 5)))

  return (
    <div className='p-4'>
      <div className='border border-gray-300 ml-4 py-4 rounded-sm'>
        {slots.map((el) => {
          return (
            <div key={el.id} className={'bg-cyan-200 border border-cyan-500 rounded w-1/' + el.width}>{el.start + " - " + el.end} </div>)
        })
        }</div>
    </div>
  )
}