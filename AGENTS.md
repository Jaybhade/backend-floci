# Project working agreement

- This is a learning project. Explain concepts from first principles and give small, sequential exercises. The user implements application changes unless they explicitly ask you to make them. Read-only inspections and verification are authorized.
- Build an AI knowledge assistant using Next.js, Express, TypeScript, Node 25, and a hosted DeepSeek model. Confirm the provider endpoint and model identifier before AI integration. Keep API keys out of frontend code, Git, images, and logs.
- Deploy the initial application early, then develop and release incrementally. Apply production engineering practices as needed without making a distributed system a prerequisite for the MVP.
- Use Floci as the local AWS deployment target. Do not modify Floci's internals or configuration. Provision application resources through its console, AWS-compatible APIs, CLI, or infrastructure as code. Explain relevant differences from real AWS.
- Frontend and backend have separate GitHub repositories: `Jaybhade/webapp-floci` and `Jaybhade/backend-floci`. Keep application configuration separate from Floci's setup and runtime data.
- Defer writing an automated test suite until after the MVP, per the user's preference. Continue appropriate build checks and functional verification of completed work. Report what passed, failed, and remains unverified.
- Report measured traffic capacity with the workload, duration, environment, resource limits, latency, and errors. Distinguish targets from measured results; do not infer real AWS capacity from local tests or extrapolate a health endpoint to database or AI workloads.
- Before proposing a milestone, check foundational gaps: Git/GitHub, runtime versions, dependency lockfiles, configuration, secrets, Docker, deployment, logging, and rollback. Explain which gaps matter now and which are deliberately deferred.
- Consult `docs/project-status.md` when choosing the next milestone. Update it after meaningful progress or a changed decision. Keep relevant shared milestones consistent with the other repository's status document.
- Give a bounded next exercise and verify its completion before advancing. Do not claim a deployment is updated until the running application uses the intended artifact.
