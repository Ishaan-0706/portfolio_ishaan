# Ishaan Parikh — Portfolio

A personal portfolio featuring projects, education, original articles, curated reading, and a contact form. Built with Next.js, React, TypeScript, and an Express API that sends email through Resend.

## Project structure

```text
apps/
├── web/                     Next.js frontend
│   ├── app/                 Pages, layouts, and global styles
│   ├── components/          Shared UI and interactive forms
│   ├── content/posts/       Markdown/MDX articles and authoring guide
│   ├── lib/                 Profile data, article loader, and tests
│   ├── public/              Public assets
│   └── .env.example         Frontend configuration template
└── api/                     Express contact service
    ├── src/
    │   ├── app.ts           Routes, validation, and rate limiting
    │   ├── app.test.ts      API tests
    │   └── server.ts        Resend integration and server startup
    └── .env.example         Server configuration template
package.json                 Workspace scripts
package-lock.json            Locked dependencies
```

Dependencies, build output, secrets, local agent tooling, planning documents, and original design exports are excluded from Git.

## Run locally

Requires Node.js 20.9 or later and npm.

```bash
npm ci
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

Open http://localhost:3000. The API listens on port 4000; Next.js forwards `/api/contact` to it. Pages work without email credentials, but the contact form reports a delivery error until Resend is configured.

## Configure contact email

Set these values in `apps/api/.env`:

| Variable | Purpose |
| --- | --- |
| `PORT` | API port; defaults to `4000` |
| `FRONTEND_ORIGIN` | Frontend origin; locally `http://localhost:3000` |
| `RESEND_API_KEY` | Private Resend sending key |
| `CONTACT_FROM` | Sender address on your verified domain |
| `CONTACT_TO` | Inbox receiving contact messages |

For testing, `CONTACT_FROM=onboarding@resend.dev` can send only to the email associated with your Resend account. For production, verify your sending domain in Resend. Visitor email addresses are used as Reply-To, not as the sender.

Keep credentials in the API environment. Never use a `NEXT_PUBLIC_` variable for a secret. Restart the apps after changing environment variables.

## Update content

- Edit `apps/web/lib/profile.ts` for projects, contact details, and social links.
- Edit `apps/web/app/about/page.tsx` for biography, education, and milestones.
- Add trusted `.md` or `.mdx` articles to `apps/web/content/posts/`. See its README for frontmatter and curated-link examples.
- Store public images in `apps/web/public/`.

MDX can execute server code. Only add trusted author content; do not accept article uploads from visitors.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Tests cover article metadata and source validation, contact validation, spam rejection, rate limiting, and delivery failures.

## Deploy

### Frontend: Vercel

Import the GitHub repository, select **Next.js**, and set **Root Directory** to `apps/web`. Enable access to files outside that directory so npm can use the workspace lockfile. Use the default Next.js output settings. Set `API_URL` to the deployed Express service origin before building.

### API: a Node.js host

Deploy from the repository root with:

```bash
npm ci
npm run build -w apps/api
npm start -w apps/api
```

Use the install/build commands during deployment and the start command to run the service. Set the API environment variables on the host, with `FRONTEND_ORIGIN` pointing to the deployed website. `GET /health` is available for health checks.

Rate limits are stored in process memory. Use a shared store before running multiple replicas. Configure Express proxy trust for the host’s actual proxy topology before relying on forwarded client IPs.
