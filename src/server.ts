import { app } from "./app.js";

const port = 4000;

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});