function convertDateToTimestamp(date) {
  let splittedDate = date.split(':')
  return parseInt(splittedDate[0]) * 60 + parseInt(splittedDate[1])
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

export function isOverLapping(slot1, slot2) {
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
