// JSON Server module
import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
// Make sure the db.json is only read-only and served from memory to avoid errors when deployed to vercel.
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
const router = jsonServer.router(data);


server.use(middlewares);

server.use(
 // Add custom route here if needed
 jsonServer.rewriter({
  "/api/*": "/$1",
 })
);
server.use(router);
server.listen(3000, () => {
 console.log("JSON Server is running");
});

// Export the Server API
export default server;