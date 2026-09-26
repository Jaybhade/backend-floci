# Backend project status

Last updated: 2026-09-27. This records verified milestones and decisions; it is not a claim that the application is production ready.

## Goal and decisions

- Build an AI knowledge assistant, growing from basic frontend/backend communication to persistence, LLM calls, document uploads, RAG, background workers, and distributed systems when needed.
- The user writes the application; the assistant teaches, reviews, and verifies unless explicitly asked to implement changes.
- Deploy the current small application through Floci EC2 before building the full MVP. No real AWS account is part of the current plan.
- Treat Floci as independently managed cloud infrastructure. Do not change its source or configuration.
- Use Node 25 by explicit user choice. Its production support lifecycle was discussed; do not silently substitute another major version.
- Use the user's hosted DeepSeek model. The user calls it DeepSeek v4.1; the exact API endpoint and model identifier remain unverified. No key is needed yet.
- Defer writing an automated test suite until after the MVP. Continue functional and build verification.
- Backend package manager: npm, with `package-lock.json`. Frontend: pnpm, with `pnpm-lock.yaml`.

## Repositories

- Backend: https://github.com/Jaybhade/backend-floci
- Frontend: https://github.com/Jaybhade/webapp-floci
- Both local `main` commits matched GitHub when last checked. Application infrastructure belongs with the relevant repository; Floci setup and data stay outside both.

## Completed and verified

- Express 5 and TypeScript backend separates `src/app.ts` from `src/server.ts`.
- `GET /health` returns `200` with `{"status":"ok"}`. `GET /api/info` returns the application name and version. Unknown requests return JSON `404` responses.
- Type checking and compilation passed under Node 25. The development command started successfully.
- A multi-stage Dockerfile compiles TypeScript, installs production dependencies in the runtime stage, and runs `node dist/server.js` as the non-root `node` user. TypeScript and tsx were absent from the verified runtime image.
- Backend has its own `compose.yaml` and `.dockerignore`. Compose publishes laptop port 4001 to application port 4000, with one CPU and 256 MiB memory limits. The separate Compose service was observed running; its HTTP behavior has not been independently retested since the Compose transition.
- The migrated standalone Docker container passed eight checks: both GET routes, an unknown path, a query string, POST to each route, `/health/`, and `HEAD /health`. Checks covered status, content type, and bodies where applicable.
- Frontend is a Next.js starter application. Its lint, TypeScript checks, and production build passed earlier. It is not connected to the backend or deployed through Floci yet.
- AWS CLI installation initially failed because two root-owned Tailscale symlinks could not be read. The user reports installation succeeded, and `/opt/homebrew/bin/aws` is now present.
- AWS CLI 2.37.4 is verified. EC2 `DescribeImages` and `DescribeInstances` succeeded against `http://localhost:4566` in `us-east-1` using temporary dummy credentials. The catalog includes Ubuntu 24.04 ARM64 images. No EC2 instances were returned in that account/region. No saved CLI profiles were listed; the dedicated `floci` profile still needs configuring.

## Measured traffic baseline

Most recent completed load test: migrated standalone Express Docker backend on the user's Apple M1 Pro laptop, one CPU limit, 256 MiB memory limit, `GET http://localhost:4001/health`.

| Measurement | Result |
| --- | --- |
| Offered traffic | 10 requests/second for 30 seconds |
| Successful requests | 300 / 300 |
| Errors | 0 |
| Median latency | 3.30 ms |
| p95 latency | 10.93 ms |
| p99 latency | 18.01 ms |

This short test verifies the first target for that endpoint and environment. It does not establish maximum capacity, long-term stability, database/AI capacity, or real AWS performance. Floci EC2 capacity remains unmeasured.

## Next milestone

1. Configure the dedicated dummy-credential `floci` profile and verify an EC2 image listing with that profile. API connectivity is verified using temporary credentials; the saved profile is not yet configured.
2. Choose an image actually supported by the installed Floci version, provision an application instance, and learn access and networking.
3. Deploy the existing backend, verify the deployed routes, and document how to update and roll back it.
4. Deploy the frontend and connect it to the backend. Measure the deployed environment before further feature work.

## Deliberately deferred

- Automated test suite, GitHub Actions CI/CD, Terraform, structured application logging, and a formal rollback mechanism are not implemented yet. Introduce deployment logging and repeatable updates during the first deployment; add CI/CD once those steps work.
- Authentication, database persistence, LLM integration, RAG, queues, and scaling are future feature milestones.
