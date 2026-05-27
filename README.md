# OnboardAI — Automatisation intelligente de l'onboarding client

> Chaque nouveau client guidé vers la valeur en 7 jours, pas 30.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat&logo=redis)](https://redis.io)

---

## Vue d'ensemble

OnboardAI automatise le parcours d'onboarding des nouveaux clients SaaS. Elle orchestre des séquences d'emails contextuels, des checklists de configuration adaptées au profil client, des triggers d'activation personnalisés, et des alertes pour les CSMs quand un client stagne à une étape critique.

**Domaine :** Customer Success / Product-Led Growth  
**Port VM :** 3010 | **Sous-domaine :** onboardai.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Onboarding tracker, progress dashboard |
| Backend | FastAPI (Python 3.11), Uvicorn | API parcours, étapes, triggers |
| Email | Resend (SMTP) + Jinja2 | Séquences email contextuelles |
| Scheduler | APScheduler + Redis | Déclenchement événements time-based |
| Analytics | PostgreSQL views + pandas | Activation funnel, completion rates |
| Base de données | PostgreSQL 16 | Clients, parcours, étapes, events |
| Cache | Redis 7 | Session state, event queue |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3010) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
apscheduler==3.10.4
redis==5.0.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
pydantic==2.7.1
jinja2==3.1.4
resend==0.7.2
pandas==2.2.2
```

---

## Architecture mono-repo

```
onboardai/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx              # Dashboard onboarding progress
│   │   ├── customers/            # Liste clients avec étape + progression
│   │   ├── customers/[id]/       # Profil client + checklist + timeline
│   │   └── journeys/             # Configuration parcours d'onboarding
│   └── src/components/
│       ├── ProgressBar.tsx       # Barre de progression étapes 1-5
│       ├── OnboardingChecklist.tsx # Checklist interactive
│       ├── StageCard.tsx         # Carte étape avec statut
│       ├── ActivationFunnel.tsx  # Funnel activation (Recharts)
│       └── StuckAlert.tsx        # Alerte client bloqué > N jours
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── customers.py      # CRUD clients + progression
│   │   │   ├── journeys.py       # Templates parcours
│   │   │   └── events.py         # POST /events (product events)
│   │   ├── services/
│   │   │   ├── journey_engine.py # Orchestration étapes
│   │   │   ├── trigger.py        # Déclencheurs event/time-based
│   │   │   ├── email_sequence.py # Séquences Jinja2 + Resend
│   │   │   └── activation.py     # Détection moments d'activation
│   │   └── models/
│   │       ├── customer.py
│   │       └── journey.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0891b2', 'primaryTextColor': '#fff', 'primaryBorderColor': '#0e7490', 'lineColor': '#374151', 'secondaryColor': '#ecfeff'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3010)"]
        NEXT["Next.js 14\nOnboarding Dashboard"]
        API["FastAPI"]
        SCHED["APScheduler\nTime-based triggers"]

        subgraph ENGINE["🚀 Journey Engine"]
            JOURNEY["Journey Orchestrator\nÉtapes + conditions"]
            EMAIL["Email Sequence\nJinja2 + Resend"]
            TRIGGER["Event Triggers\nProduct activation events"]
        end

        PG[("PostgreSQL\nJourneys + Progress")]
        REDIS[("Redis\nEvent queue")]
    end

    PRODUCT["Product\nEvents API"] --> TRIGGER
    TRIGGER --> JOURNEY
    JOURNEY --> EMAIL
```

### Séquence — Progression d'un client dans le parcours

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0891b2', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant PROD as Product
    participant API as FastAPI
    participant ENG as Journey Engine
    participant EMAIL as Email Sequence
    participant CSM as CS Manager

    PROD->>API: POST /events {customer_id, event: "first_import_completed", metadata: {rows: 500}}

    API->>ENG: process_event(customer_id, event)
    ENG->>ENG: check_step_completion(step=2, condition=first_import)
    ENG-->>API: step 2 completed, advance to step 3

    API->>EMAIL: send_milestone_email(customer, step=3, template="import_success")
    EMAIL-->>API: email sent

    API->>ENG: schedule_step3_reminder(customer_id, eta=now+3days)

    Note over ENG: Si J+3 et étape 3 non complétée...
    ENG->>CSM: alert "Alice R. bloquée à l'étape 3 depuis 3 jours"

    API-->>PROD: {step: 3, progress: 60, next_milestone: "connect_integration"}
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0891b2', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    CUSTOMER {
        uuid id PK
        string name
        string email
        string tier
        int current_step
        float completion_pct
        boolean is_activated
        boolean is_stuck
        int days_since_last_activity
        timestamp onboarded_at
    }
    JOURNEY_TEMPLATE {
        uuid id PK
        string name
        string tier
        int total_steps
        jsonb steps_config
    }
    JOURNEY_STEP {
        uuid id PK
        uuid template_id FK
        int step_number
        string title
        string completion_event
        int max_days_allowed
        string email_template
    }
    CUSTOMER_PROGRESS {
        uuid id PK
        uuid customer_id FK
        uuid step_id FK
        string status
        timestamp completed_at
        int days_taken
    }

    CUSTOMER }o--|| JOURNEY_TEMPLATE : "follows"
    JOURNEY_TEMPLATE ||--o{ JOURNEY_STEP : "contains"
    CUSTOMER ||--o{ CUSTOMER_PROGRESS : "tracks"
    JOURNEY_STEP ||--o{ CUSTOMER_PROGRESS : "recorded_in"
```

---

## PRD

### Problème
70% des clients SaaS qui churent dans les 90 premiers jours n'ont jamais atteint leur "aha moment". L'onboarding manuel via emails ad hoc et appels hebdomadaires est lent, incohérent entre CSMs, et ne scale pas au-delà de 50 clients par CSM.

### Solution
OnboardAI orchestre un parcours d'onboarding en 5 étapes avec des triggers automatiques (email de félicitation quand étape complétée, alerte CSM si bloqué), adaptés au tier client et au persona utilisateur. Time-to-value divisé par 3.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Customer Success Manager | Voir où chaque client en est, intervenir sur les bloqués |
| New Client | Être guidé pas à pas vers la valeur du produit |
| Head of Customer Success | Funnel d'activation, time-to-value, NPS J+30 |

### OKRs
- Time-to-value (aha moment) < 7 jours (vs 21j sans onboarding)
- Taux de complétion onboarding > 80%
- Churn J-90 réduit de 35%

---

## User Stories

```
US-01 [CSM] En tant que Customer Success Manager,
      je veux voir en un coup d'œil quel client est bloqué depuis plus de 3 jours
      à quelle étape
      afin d'intervenir proactivement avant qu'il abandonne.

US-02 [Client] En tant que nouveau client,
      je veux recevoir un email de félicitation chaque fois que je complète une étape
      afin d'avoir un sentiment de progression.

US-03 [Admin] En tant qu'admin CS,
      je veux créer des parcours d'onboarding différents selon le tier
      (Enterprise 8 étapes, SMB 5 étapes, Startup 3 étapes)
      afin de ne pas surcharger les petits clients.

US-04 [Product] En tant que Product Manager,
      je veux voir le funnel d'activation (% de clients à chaque étape)
      afin d'identifier le point de blocage principal.

US-05 [CSM] En tant que CSM,
      je veux que le parcours s'adapte automatiquement
      si un client saute des étapes grâce à une expérience préalable
      afin de ne pas envoyer des emails inutiles.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | 5 étapes standard | Setup → Import → Config → Integration → Go-live | ✅ Progress bar |
| R2 | Stuck detection | Pas de progression en 3j → "stuck", alerte CSM | ✅ Stuck badge |
| R3 | Milestone email | Complétion étape → email automatique dans 1h | ✅ Email preview |
| R4 | Tier adaptation | Enterprise: 8 étapes, SMB: 5 étapes, Startup: 3 étapes | ✅ Tier selector |
| R5 | Skip logic | Événement product avancé → sauter les étapes précédentes | ✅ Skip demo |
| R6 | Activation event | Étape 3 = activation (aha moment), déclenche suivi NPS | ✅ Activation badge |
| R7 | Reminder cadence | Étape non complétée → reminder J+3, J+7, puis alerte CSM | ✅ Timeline |
| R8 | Health score sync | Progression onboarding alimente le CHS PulseScope | ✅ Sync demo |
| R9 | CSM assignment | Tier Enterprise → CSM dédié, SMB → pool | ✅ Assignment |
| R10 | Graduation | 100% complété → passage en mode "adoption" | ✅ Graduation card |

---

## Spécification API

**Base URL :** `http://onboardai.wikolabs.com/api/v1`

### POST /events
```json
{"customer_id": "c1", "event": "first_import_completed", "metadata": {"rows_imported": 500}}
// Response: {"step_completed": 2, "next_step": 3, "email_sent": "import_success", "progress_pct": 40}
```

### GET /customers/{id}/journey
```json
// Response: {"current_step": 3, "completion_pct": 60, "is_stuck": false, "steps": [{"step": 1, "status": "completed", "days_taken": 1}, ...]}
```

### GET /metrics/funnel
```json
// Response: {"steps": [{"step": 1, "completion_rate": 0.95}, {"step": 2, "completion_rate": 0.82}, {"step": 3, "completion_rate": 0.64}]}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Progress Dashboard** | Liste clients avec barre de progression colorée et badge "stuck" |
| **Onboarding Checklist** | Checklist interactive avec étapes cochables et animations |
| **Activation Funnel** | Recharts bar chart : % clients à chaque étape |
| **Email Preview** | Preview des emails milestone par étape |
| **Journey Builder** | Config étapes drag-and-drop avec triggers |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: onboardai, POSTGRES_USER: oa_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://oa_user:${POSTGRES_PASSWORD}@postgres/onboardai
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3010:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Parcours 5 étapes fixe
- [ ] Stuck detection + alertes email CSM
- [ ] Dashboard progression

### Phase 2 — Personnalisation
- [ ] Journey builder (étapes configurables)
- [ ] Tier adaptation (Enterprise/SMB/Startup)
- [ ] Funnel analytics

### Phase 3 — Intelligence
- [ ] Prédiction temps de complétion (ML)
- [ ] Recommandation étape suivante personnalisée
- [ ] Intégration RetainIQ (onboarding → churn score)

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
