# EAT (Etimo Activity Tracker)

Aktivitetstävlingsapp skriven i **React Native** och **Next.js**. Front-end delas mellan native och web.

# Utveckla lokalt

Från root i projektet

```
yarn
docker compose up -d
yarn dev
```

To re-seed db:
```
(cd apps/eat-backend && npm run db:seed)
```
