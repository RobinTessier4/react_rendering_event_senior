export function convertDate(slots) {
  //* calculate end time
  slots.forEach((slot) => {
    let splitStart = slot.start.split(':')
    let time =
      parseInt(splitStart[0]) * 60 + parseInt(splitStart[1]) + slot.duration
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
  if (
    (slot1.start < slot2.end && slot1.start >= slot2.start) ||
    (slot1.end > slot2.start && slot1.end <= slot2.end)
  ) {
    return true
  }
  return false
}
