import { inputs } from '../data/inputs'
import React, { useState } from 'react'
import {
  convertDate,
  sortsDates,
  findOverlaps,
  findSlotWidth,
  findSlotPosition,
  findWidthRatio,
} from '../utils/utils'

function parseSlots(slots) {
  convertDate(slots)
  sortsDates(slots)

  slots.forEach((slot, index) => {
    slot.overlapIndexes = findOverlaps(slots, index)
    slot.width = findSlotWidth(slots, index)
    slot.position = findSlotPosition(slots, index)
    slot.widthRatio = findWidthRatio(slots, index)
  })
  return slots
}

export default function Schedule() {
  const [slots] = useState(parseSlots(inputs))

  return (
    <div className="mt-4 border bg-gray-50 rounded-sm">
      <ul className="relative ml-4 text-cyan-700 timeslots">
        <li style={{ position: 'absolute' }}>
          9:00 <sup>am</sup>
        </li>
        <li style={{ position: 'absolute', top: '60px' }}>
          10:00 <sup>am</sup>
        </li>
        <li style={{ position: 'absolute', top: '120px' }}>
          11:00 <sup>am</sup>
        </li>
        <li style={{ position: 'absolute', top: '180px' }}>
          12:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '240px' }}>
          1:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '300px' }}>
          2:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '360px' }}>
          3:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '420px' }}>
          4:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '480px' }}>
          5:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '540px' }}>
          6:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '600px' }}>
          7:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '660px' }}>
          8:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '720px' }}>
          9:00 <sup>pm</sup>
        </li>
      </ul>
      <div className="flex justify-end">
        <div className="border border-gray-300 ml-4 py-2 rounded relative h-[750px] w-11/12 bg-slate-50 mr-0	">
          {slots.map((el) => {
            return (
              <div
                key={el.id}
                style={{
                  height: el.duration * 1,
                  top: (el.timeStamp - 540) * 1,
                  left:
                    el.width === 1 ? 0 : (el.position / el.width) * 100 + '%',
                  right: el.width === 1 && 0,
                  width: (el.widthRatio / el.width) * 100 + '%',
                  fontSize: '7px',
                }}
                className="absolute bg-cyan-200 border border-cyan-500 rounded"
              >
                {el.start + ' - ' + el.end}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
