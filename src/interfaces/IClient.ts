import { WebSocket } from 'ws';

export default interface IClient {
   id: number,
   ws: WebSocket
}