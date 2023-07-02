import "dotenv/config";
import { createServer } from 'http';
import { router } from './router';

const DEFAULT_API_PORT = 4000;

const PORT = Number(process.env.PORT || DEFAULT_API_PORT);

export const server = createServer(router(PORT));

server.listen(PORT, () => {
  console.log(
    `Server #${process.pid} is running on port ${PORT}`
  );
});