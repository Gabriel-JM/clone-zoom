export class SocketBuilder {
  onUserConnect = () => {}
  onUserDisconnect = () => {}

  constructor({ socketUrl }) {
    this.socketUrl = socketUrl
  }

  setOnUserConnect(fn) {
    this.onUserConnect = fn
    return this
  }

  setOnUserDisconnect(fn) {
    this.onUserDisconnect = fn
    return this
  }

  build() {
    const socket = io.connect(this.socketUrl, {
      withCredentials: false
    })

    socket.on('user-connected', this.onUserConnect)
    socket.on('user-disconnected', this.onUserDisconnect)

    return socket
  }
}
