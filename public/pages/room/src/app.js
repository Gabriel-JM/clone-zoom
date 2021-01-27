import { View } from './view.js'
import { Media } from './util/media.js'
import { Business } from './util/business.js'
import { SocketBuilder } from './util/socket.js'

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

  const socketUrl = 'http://localhost:3000'
  const socketBuilder = new SocketBuilder({ socketUrl })
  const view = new View()
  const media = new Media()
  Business.initialize({
    view,
    media,
    room,
    socketBuilder
  })
}

window.onload = onload