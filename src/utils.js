function correctPosition(date, index, cards) {
  let dateNr = dateStrToNr(date)
  let dateNrs = cards.map(el => dateStrToNr(el.date))
  if (index === 0 && dateNrs[1] > dateNr) {
    return true
  } else if (index === dateNrs.length - 1 && dateNrs[index - 1] < dateNr) {
    return true
  } else if (dateNr < dateNrs[index + 1] && dateNr > dateNrs[index - 1]) {
    return true
  } else {
    return false
  }
}

//convert a date to a number, ie '2018-08-13' -> 20180813
function dateStrToNr(str) {
  str = new Date(str).toISOString().split('T')[0];
  return Number(str.split('-').reduce((a, b) => a + b));
}

//compare date on cards
function compareCards(cardA, cardB) {
  return dateStrToNr(cardA.date) - dateStrToNr(cardB.date)
}

function sortCards(cards) {
  return [...cards.sort(compareCards)]
}

export { 
  correctPosition,
  sortCards
}