import express from "express";

export const app = express();

app.enable("strict routing");

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

// Add GET /api/info here yourself.

app.get("/api/info", (_request, response) => {
  response.status(200).json({
    name: "AI Knowledge Assistant",
    version: "0.1.0",
  });
});

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" });
});
