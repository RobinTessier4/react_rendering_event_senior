function convertDateToTimestamp(date) {
  let splittedDate = date.split(':')
  return parseInt(splittedDate[0]) * 60 + parseInt(splittedDate[1])
}

function isOverLapping(slot1, slot2) {
  //* return true if slot 1 and slot 2 overlap
  let start1 = convertDateToTimestamp(slot1.start)
  let end1 = convertDateToTimestamp(slot1.end)
  let start2 = convertDateToTimestamp(slot2.start)
  let end2 = convertDateToTimestamp(slot2.end)
  if (
    (start1 < end2 && start1 >= start2) ||
    (end1 > start2 && end1 <= end2) ||
    (end1 >= end2 && start1 <= start2)
  ) {
    return true
  }
  return false
}

export function convertDate(slots) {
  //* calculate end time
  slots.forEach((slot) => {
    let time = convertDateToTimestamp(slot.start) + slot.duration
    let newHour = Math.floor(time / 60).toString()
    let newMin = time % 60 === 0 ? '00' : (time % 60).toString()
    slot.end = newHour + ':' + newMin
    slot.timeStamp = time - slot.duration
  })
  return slots
}

export function sortsDates(slots) {
  //* sorts slots by duration and starting time
  slots.sort((a, b) => (a.duration < b.duration ? 1 : -1))
  slots.sort((a, b) => (a.start > b.start ? 1 : -1))
  return slots
}

export function findOverlaps(slots, index) {
  //* fill an array with indexes of overlapping elements
  let overlapWith = []
  for (let i = 0; i < slots.length; i++) {
    if (i !== index && isOverLapping(slots[index], slots[i])) {
      overlapWith.push(i)
    }
  }
  return overlapWith
}

export function findSlotWidth(slots, index) {
  //* first assume that a slot A overlapping with slot B and C will take 1/3 of window width
  //* then if the slot is overlapping with other slots, take the width of the first one by order
  let width = slots[index].overlapWith.length + 1
  if (
    slots[index].overlapWith.length &&
    slots[slots[index].overlapWith[0]].overlapWith
  ) {
    width = slots[slots[index].overlapWith[0]].width
  }
  return width
}

export function findSlotPosition(slots, index) {
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

export function findWidthRatio(slots, index) {
  //* if an element doesnt completely fill the space horizontally change his ratio
  //* for example from 1/3 to 2/3 of the screen
  let widthRatio = 1
  if (slots[index].overlapWith.length < slots[index].width - 1) {
    widthRatio = slots[index].width - slots[index].overlapWith.length
  }
  return widthRatio
}
