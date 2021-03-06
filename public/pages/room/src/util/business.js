export class Business {
  currentStream = {}
  currentPeer = {}
  socket = {}
  peers = new Map()

  constructor({ room, media, view, socketBuilder, peerBuilder }) {
    this.room = room
    this.media = media
    this.view = view
    this.socketBuilder = socketBuilder
    this.peerBuilder = peerBuilder
  }
  
  static initialize(deps) {
    const instance = new Business(deps)
    return instance._init()
  }
  
  async _init() {
    this.currentStream = await this.media.getCamera()
    
    this.socket = this.socketBuilder
      .setOnUserConnect(this.onUserConnected())
      .setOnUserDisconnect(this.onUserDisconnected())
      .build()
    ;
    
    this.currentPeer = await this.peerBuilder
      .setOnError(this.onPeerError())
      .setOnConnectionOpened(this.onPeerConnectionOpened())
      .setOnCallReceived(this.onPeerCallReceived())
      .setOnPeerStreamReceived(this.onPeerStreamReceived())
      .setOnCallError(this.onPeerCallError())
      .setOnCallClose(this.onPeerCallClose())
      .build()
    this.addVideoStream(this.currentPeer.id)
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
      this.currentPeer.call(userId, this.currentStream)
    }
  }

  onUserDisconnected() {
    return userId => {
      console.log('user disconnected!', userId)
      if(this.peers.has(userId)) {
        this.peers.get(userId).call.close()
        this.peers.delete(userId)
      }

      this.view.setParticipants(this.peers.size)
      this.view.removeVideoElement(userId)
    }
  }

  onPeerError() {
    return error => {
      console.error('error on peer!', error)
    }
  }

  onPeerConnectionOpened() {
    return peer => {
      const { id } = peer
      this.socket.emit('join-room', this.room, id)
    }
  }

  onPeerCallReceived() {
    return call => {
      console.log('answering call', call)
      call.answer(this.currentStream)
    }
  }

  onPeerStreamReceived() {
    return (call, stream) => {
      const { peer: callerId } = call
      this.addVideoStream(callerId, stream)
      this.peers.set(callerId, { call })
      this.view.setParticipants(this.peers.size)
    }
  }

  onPeerCallError() {
    return (call, error) => {
      console.log('an call error ocurred!', error)
      this.view.removeVideoElement(call.peer)
    }
  }

  onPeerCallClose() {
    return call => {
      console.log('Call closed!', call.peer)
      this.view.removeVideoElement(call.peer)
    }
  }

}
