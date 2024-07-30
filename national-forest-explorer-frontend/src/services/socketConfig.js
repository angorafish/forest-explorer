// This file sets up a socket connection to a server, allowing real-time, two-way communication
import { io } from 'socket.io-client';
// Establishing a connection to the socket.IO server (backend)
const socket = io('http://localhost:3000');

export default socket;