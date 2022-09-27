import { inputs } from '../../data/inputs'
import React, { useState } from 'react'
import { parseSlots } from './ScheduleFunctions'

export default function Schedule() {
  const [slots] = useState(parseSlots(inputs))

  return (
    <div className="mx-2">
      <ul className="relative ml-4 text-cyan-700 timeslots">
        <li style={{ position: 'absolute' }}>
          9:00 <sup>am</sup>
        </li>
        <li style={{ position: 'absolute', top: '66px' }}>
          10:00 <sup>am</sup>
        </li>
        <li style={{ position: 'absolute', top: '132px' }}>
          11:00 <sup>am</sup>
        </li>
        <li style={{ position: 'absolute', top: '198px' }}>
          12:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '264px' }}>
          1:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '330px' }}>
          2:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '396px' }}>
          3:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '462px' }}>
          4:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '528px' }}>
          5:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '594px' }}>
          6:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '660px' }}>
          7:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '726px' }}>
          8:00 <sup>pm</sup>
        </li>
        <li style={{ position: 'absolute', top: '792px' }}>
          9:00 <sup>pm</sup>
        </li>
      </ul>
      <div className="flex justify-end">
        <div className=" ml-4 py-2 rounded relative h-[850px] w-11/12 bg-slate-50 mr-0	">
          {slots.map((el) => {
            return (
              <div
                key={el.id}
                style={{
                  height: el.duration * 1.1,
                  top: (el.timeStamp - 540) * 1.1,
                  left:
                    el.width === 1 ? 0 : (el.position / el.width) * 100 + '%',
                  right: el.width === 1 && 0,
                  width: (el.widthRatio / el.width) * 100 + '%',
                  fontSize: '7px',
                }}
                className="absolute bg-cyan-200 border border-cyan-500 rounded flex justify-center items-center"
              >
                <div>{el.id}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
