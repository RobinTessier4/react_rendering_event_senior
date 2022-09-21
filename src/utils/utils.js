function convertDateToTimestamp(date) {
  const splittedDate = date.split(':')
  return parseInt(splittedDate[0]) * 60 + parseInt(splittedDate[1])
}

function isOverLapping(slot1, slot2) {
  const start1 = convertDateToTimestamp(slot1.start)
  const end1 = convertDateToTimestamp(slot1.end)
  const start2 = convertDateToTimestamp(slot2.start)
  const end2 = convertDateToTimestamp(slot2.end)
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
  slots.forEach((slot) => {
    const time = convertDateToTimestamp(slot.start) + slot.duration
    const newHour = Math.floor(time / 60).toString()
    const newMin = time % 60 === 0 ? '00' : (time % 60).toString()
    slot.end = newHour + ':' + newMin
    slot.timeStamp = time - slot.duration
  })
  return slots
}

export function sortsDates(slots) {
  slots.sort((a, b) => (a.duration < b.duration ? 1 : -1))
  slots.sort((a, b) => (a.start > b.start ? 1 : -1))
  return slots
}

export function findOverlaps(slots, index) {
  let overlapIndexes = []
  for (let i = 0; i < slots.length; i++) {
    if (i !== index && isOverLapping(slots[index], slots[i])) {
      overlapIndexes.push(i)
    }
  }
  return overlapIndexes
}

export function findSlotWidth(slots, index) {
  let width = slots[index].overlapIndexes.length + 1
  if (
    slots[index].overlapIndexes.length &&
    slots[slots[index].overlapIndexes[0]].overlapIndexes
  ) {
    width = slots[slots[index].overlapIndexes[0]].width
  } else
    for (let i = 0; i < slots[index].overlapIndexes.length; i++) {
      if (
        i < slots[index].overlapIndexes.length - 1 &&
        !isOverLapping(
          slots[slots[index].overlapIndexes[i]],
          slots[slots[index].overlapIndexes[i + 1]],
        )
      ) {
        width--
      }
    }
  return width
}

export function findSlotPosition(slots, index) {
  let position = 0
  for (let i = 0; i < slots[index].overlapIndexes.length; i++) {
    if (
      typeof slots[slots[index].overlapIndexes[i]].position !== 'undefined' &&
      slots[slots[index].overlapIndexes[i]].position < slots[index].width - 1
    ) {
      position++
    }
  }
  return position
}

export function findWidthRatio(slots, index) {
  let widthRatio = 1
  if (slots[index].overlapIndexes.length < slots[index].width - 1) {
    widthRatio = slots[index].width - slots[index].overlapIndexes.length
  }
  return widthRatio
}
