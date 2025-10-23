import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

let clients: Set<WebSocket> = new Set();

export const initWebSocketServer = (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (client) => {
    console.log('WebSocket client connected');
    clients.add(client);

    client.on('close', () => {
      console.log('WebSocket client disconnected');
      clients.delete(client);
    });

    // ✅ Enviar JSON válido si quieres confirmar conexión
    client.send(JSON.stringify({ status: 'WebSocket OPEN' }));
  });

  console.log('WebSocket server initialized');
};

export const broadcastTelemetry = (data: any) => {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
