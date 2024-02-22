# EAT-Backend

REST API-projekt för dom två front-end klienterna. Använder `fastify` som server samt `mikro-orm` och `MySQL` för datahantering.

### Setup

Docker behöver vara installerat. Startas med hjälp av docker-compose i rooten av monorepot.

Installation

```bash
cd ../../ && yarn
```

Utveckling (Startar DB + Backend)

```bash
# Startar projektet i utvecklingsläge med hotreload
cd ../../ && docker-compose up -d
```

### Test

Tester är uppdelat i integrationstestar och enhetstester. Dessa använder `vitest`.
Integrationtesterna använder en dedikerad MySQL-container för hantering av data. Denna container sätts upp vid teststart och raderas efter avslutat test.

Integrationstester (MySQL + Test)

```bash
yarn test:integration
# or
yarn test:integration:watch
```
