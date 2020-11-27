import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service('websockets') websockets;
  socketRef = null;
  bitcoins = [];

  constructor() {
    super(...arguments);
    const socket = this.websockets.socketFor('wss://ws.sfox.com/ws');

    socket.on('open', this.subscribeToBtStreaming, this);
    socket.on('message', this.getBitcoinData, this);
    socket.on('close', this.unSubscribeToBtStreaming, this);

    this.set('socketRef', socket);
  }

  subscribeToBtStreaming(event) {
    const subscribeMsg = {
        type: "subscribe",
        feeds: ["ticker.sfox.btcusd"]
    }
    this.socketRef.send(JSON.stringify(subscribeMsg));
  }

  getBitcoinData(event) {
    const parsed = JSON.parse(event.data);
    if (parsed.payload) {
      this.bitcoins.pushObject(parsed.payload);
    }
  }

  unSubscribeToBtStreaming(event) {
    var unsubscribe = {
          "type": "unsubscribe",
          "feeds": ["ticker.sfox.btcusd"]
      }
    this.socketRef.send(JSON.stringify(unsubscribe));
  }
}
