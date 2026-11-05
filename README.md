# Zonvio Teleprompter

Teleprompter w Next.js z logowaniem email/hasło, NextAuth i lokalnym PostgreSQL.

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Przed uruchomieniem seeda ustaw własne `AUTH_SECRET`, `SEED_USER_EMAIL` i `SEED_USER_PASSWORD` w pliku `.env`. Hasło musi mieć co najmniej 12 znaków.

Logowanie jest dostępne pod `/login`, a chroniony teleprompter pod `/dashboard`.

## Sesje na żywo

Po wybraniu skryptu kliknij `Rozpocznij sesję`, a następnie otwórz wygenerowany link na drugim urządzeniu. Lokalnie synchronizacja korzysta z API i PostgreSQL. Drugie urządzenie musi mieć dostęp do adresu komputera uruchamiającego aplikację, więc zamiast `localhost` użyj adresu sieciowego wyświetlanego przez `npm run dev`.

Po utworzeniu projektu Neon ustaw jego connection string jako produkcyjny `DATABASE_URL`, zastosuj migracje poleceniem `npx prisma migrate deploy`, włącz Neon Realtime i dodaj `NEON_REALTIME_SECRET`. Model sesji i interfejs nie wymagają wtedy zmian; transport odbiornika można przełączyć z `polling` na `neon`.
