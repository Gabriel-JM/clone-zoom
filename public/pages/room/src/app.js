import { View } from './view.js'

const recordClick = function (recorderBtn) {
  this.recordingEnabled = false
  return () => {
    this.recordingEnabled = !this.recordingEnabled
    recorderBtn.style.color = this.recordingEnabled ? 'red' : 'white'
  }
}

const onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get('room');
  console.log('this is the room', room)

  // const recorderBtn = document.getElementById('record')
  // recorderBtn.addEventListener('click', recordClick(recorderBtn))

  const view = new View()
  // view.renderVideo({ userId: 'test01', url: 'https://media.giphy.com/media/YKcq4L6zgKFHd2wnXp/giphy.mp4' })
  // view.renderVideo({ userId: 'test02', isCurrentId: true, url: 'https://media.giphy.com/media/YKcq4L6zgKFHd2wnXp/giphy.mp4' })
  // view.renderVideo({ userId: 'test02', url: 'https://media.giphy.com/media/YKcq4L6zgKFHd2wnXp/giphy.mp4' })
}

window.onload = onload