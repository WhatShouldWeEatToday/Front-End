import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


const SOCKET_URL = 'http://localhost:8080/ws-stomp';

class ChatService {
    constructor () {
        this.stompClient = null;
        this.connected = false;
    }
    // WebSocket 및 STOMP 클라이언트 생성
    connect(headers, onMessageReviced){
        const socket = new SockJS(SOCKET_URL);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect(
            headers, 
            () => {
                this.connected = true;
                console.log('Connected');
                this.stompClient.subscribe("/topic/public", (message) => {
                    onMessageReviced(JSON.parse(message.body));
                });
            },
            (error) => {
                console.error('Connection err', error);
            }
        );
    }

    disconnect() {
        if(this.stompClient !== null){
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
        this.connected = false;
    }

    sendMessage(destination, message){
        if(this.stompClient && this.connected){
            this.stompClient.send(destination, {}, JSON.stringify(message));
        }
    }
}

const chatService = new ChatService();
export default chatService;