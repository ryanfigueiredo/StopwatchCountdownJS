const TwentyFourHoursInSeconds = 23 * 60 * 60 + 59 * 60 + 60

inputTime = document.querySelector('#input-time')
buttonStartStop = document.querySelector('#btn-start-stop')
buttonClear = document.querySelector('#btn-clear')
task = document.querySelector('#task')
buttonsType = document.querySelectorAll('.btn-type')

buttonClear.addEventListener('click', function() {
  clearTime()
})

Array.from(buttonsType).forEach(function(buttonType) {
  buttonType.addEventListener('click', function() {
    toggleTitle(buttonType.innerText)
    clearTime()
  })
})

buttonStartStop.addEventListener('click', function() {
  if(this.innerText == 'Start')
    idInterval = setInterval(startTask, 1000)
  else {
    clearInterval(idInterval)
  }

  switchTextButton(this)
})

function startTask() {
  if (task.innerText.toLowerCase() == 'stopwatch') {
    seconds = stringHHMMSSToSeconds(inputTime.value)
    seconds++
    inputTime.value = secondsToTime()
  } else {
    seconds = TwentyFourHoursInSeconds - stringHHMMSSToSeconds(inputTime.value)
    seconds++
    inputTime.value = secondsToTime(-seconds)
  }
}

function secondsToTime(time = seconds) {
  var date = new Date(0)
  date.setSeconds(time)
  return date.toISOString().substring(11, 19)
}

function switchTextButton(button) {
  if(button.innerText == 'Start') 
    button.innerText = 'Stop'
  else {
    button.innerText = 'Start'
  }
}

function toggleTitle(title) {
  task.innerText = title
}

function stringHHMMSSToSeconds(string) {
  [hh, mm, ss] = string.split(':')
  return parseInt(hh) * 60 * 60 + parseInt(mm) * 60 + parseInt(ss)
}

function clearTime() {
  inputTime.value = '00:00:00'
  seconds = 0
}