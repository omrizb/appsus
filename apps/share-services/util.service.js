export const utilService = {
  loadFromStorage,
  saveToStorage,
  makeId,
  makeLorem,
  getRandomIntInclusive,
  randomTimestamp,
  getDayName,
  getMonthName,
  animateCSS,
  getRandomColor,
  padNum,
  getCurrencySign
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return (data) ? JSON.parse(data) : undefined
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function makeId(length = 4) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  const words = ['The sky', 'above', 'the port', 'was', 'the color', 'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)]
    if (size >= 1) txt += ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function randomTimestamp(startYear) {
  const start = new Date(startYear, 0, 1); // January 1, startYear
  const end = new Date(); // Current date
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return randomDate.getTime()
}

function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return monthNames[date.getMonth()]
}

function animateCSS(el, animation = 'bounce') {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    el.classList.add(`${prefix}animated`, animationName)

    function handleAnimationEnd(event) {
      event.stopPropagation()
      el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function padNum(num) {
  return num > 9 ? num + '' : '0' + num;
}

function getCurrencySign(sign) {
  switch (sign) {
    case 'EUR':
      return '€';
    case 'ILS':
      return '₪';
    case 'USD':
      return '$';
    default:
      return '';
  }
}