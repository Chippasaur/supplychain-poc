<!-- @format -->

# Visibility POC

## Getting Started

### Node.js

[installation guide](https://heynode.com/tutorial/install-nodejs-locally-nvm)

### MongoDB

[installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

```
use serai_poc_local

db.createUser({user: "serai_poc_local", roles: [ { role: "readWrite", db: "serai_poc_local"} ], pwd: "7urdsQSwi4z44A"})
```

### Vercel

Please download the `vercel CLI` from https://vercel.com/download

```bash
npm i -g vercel
# or
yarn global add vercel
# please click Y when prompted options
```

First, run the development server - [please read](https://vercel.com/blog/vercel-dev):

```bash
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## FAQ

1. Why vercel build failed with "Commit author needs to be Gitlab account."

> git config user.email "your serai email address"

1. Where are enviromental variables setup (plaintext, secrets)

> **Enviromental Variables / Secrets:** Can be set in Vercel, under project -> settings -> enviromental variables. Please read docs https://vercel.com/docs/environment-variables. Running `vercel dev` allows you to access enviromental variables created via localhost when developing locally. Environment Variables created for the Development Environment can be downloaded into a local development setup using the `vercel env pull` command provided by Vercel CLI:
