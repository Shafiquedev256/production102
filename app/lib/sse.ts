type SSEClient = {
  id: string;
  res: WritableStreamDefaultWriter<any>;
};

const clients: SSEClient[] = [];

// Register a new client
export const registerClient = (writer: WritableStreamDefaultWriter<any>) => {
  const id = Date.now() + Math.random().toString();
  clients.push({ id, res: writer });
  return id;
};

// Remove a client
export const removeClient = (id: string) => {
  const index = clients.findIndex((c) => c.id === id);
  if (index !== -1) clients.splice(index, 1);
};

// Broadcast data to all connected clients
export const broadcast = (data: any) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((client) => client.res.write(payload));
};
