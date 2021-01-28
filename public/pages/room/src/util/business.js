export class Business {
  constructor({ room, media, view, socketBuilder }) {
    this.room = room
    this.media = media
    this.view = view
    this.socketBuilder = socketBuilder
      .setOnUserConnect(this.onUserConnected())
      .setOnUserDisconnect(this.onUserDisconnected())
      .build()
  
    this.socketBuilder.emit('join-room', this.room, 'test01')
    this.currentStream = {}
  }

  static initialize(deps) {
    const instance = new Business(deps)
    return instance._init()
  }

  async _init() {
    this.currentStream = await this.media.getCamera()
    this.addVideoStream('test01')
  }

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false
    
    this.view.renderVideo({
      userId,
      muted: true,
      stream,
      isCurrentId
    })
  }

  onUserConnected() {
    return userId => {
      console.log('user conneted!', userId)
    }
  }

  onUserDisconnected() {
    return userId => {
      console.log('user disconnected!', userId)
    }
  }

}
