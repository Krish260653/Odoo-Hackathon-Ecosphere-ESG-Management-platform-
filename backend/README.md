# EcoSphere ESG - Supabase Backend Setup

This folder contains the complete database schema, security policies, triggers, business rules, and seed data scripts to initialize a **Supabase** backend for the EcoSphere ESG Platform.

---

## Folder Structure

```
backend/
├── supabase/
│   ├── migrations/
│   │   ├── 001_create_tables.sql            # Core Relational Schemas & Auth Triggers
│   │   ├── 002_rls_policies.sql             # Row-Level Security & Access Controls
│   │   ├── 003_functions_and_triggers.sql    # Trigger Engines & RPC Redeem Routines
│   │   └── 004_seed_data.sql                # Seed values & Demo Profiles
│   └── config.toml                          # Local CLI Config
├── src/
│   └── supabaseClient.js                    # Vite-Facing client initializer
├── .env.example                             # Environment reference variables
└── README.md                                # Setup guidelines (This file)
```

---

## Setup Steps

### Option A: Local Development (Supabase CLI)

1. **Install Supabase CLI** (if not already installed):
   ```bash
   brew install supabase/tap/supabase
   ```
2. **Initialize and Start Supabase locally**:
   - Make sure Docker is running on your machine.
   - Navigate to the `backend/` folder:
     ```bash
     cd backend
     ```
   - Start the Supabase local container:
     ```bash
     supabase start
     ```
3. **Deploy Migrations**:
   The CLI automatically detects the SQL files in `supabase/migrations/` and pushes them to the local database:
   ```bash
   supabase db reset
   ```
   This compiles the schemas, enables Row-Level Security, configures the functions/triggers, and seeds mock users.

---

### Option B: Cloud Deployment (Supabase Dashboard)

If deploying to a hosted Supabase cloud project:

1. **Create a new Supabase Project** in your Supabase Dashboard.
2. **Execute Database Migrations**:
   - Open the **SQL Editor** in the Supabase Dashboard.
   - Copy and run the files in the following order:
     1. [001_create_tables.sql](file:///Users/satyamyadav/Odoo-Hackathon-Ecosphere-ESG-Management-platform-/backend/supabase/migrations/001_create_tables.sql) (Creates all tables and profile triggers)
     2. [002_rls_policies.sql](file:///Users/satyamyadav/Odoo-Hackathon-Ecosphere-ESG-Management-platform-/backend/supabase/migrations/002_rls_policies.sql) (Enables RLS policies)
     3. [003_functions_and_triggers.sql](file:///Users/satyamyadav/Odoo-Hackathon-Ecosphere-ESG-Management-platform-/backend/supabase/migrations/003_functions_and_triggers.sql) (Binds calculated values, triggers, and RPC functions)
     4. [004_seed_data.sql](file:///Users/satyamyadav/Odoo-Hackathon-Ecosphere-ESG-Management-platform-/backend/supabase/migrations/004_seed_data.sql) (Seeds mock departments, emission values, and testing profiles)
3. **Configure Storage Buckets**:
   Ensure the following buckets are created with public settings matching our RLS storage parameters:
   - `policy-documents` (Public: True)
   - `challenge-proofs` (Public: True)
   - `audit-reports` (Public: False - Private)

---

## Frontend Integration Notes

To hook up your React + Vite frontend to this Supabase backend:

1. **Install SDK**:
   Inside the `frontend/` directory, install the supabase client library:
   ```bash
   npm install @supabase/supabase-js
   ```
2. **Add Environment Variables**:
   Create a `.env` in the `frontend/` directory containing your Supabase project keys:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. **Import Client**:
   Import `supabase` from the setup file in your views:
   ```javascript
   import { supabase } from '../../backend/src/supabaseClient';
   ```
4. **Auth Authentication Flow**:
   Replace the dummy role-toggle logins in `AuthContext.jsx` with real email/password sign-in triggers:
   ```javascript
   const { data, error } = await supabase.auth.signInWithPassword({
     email: 'employee@ecosphere.com',
     password: 'password123'
   });
   ```
5. **Fetch/Update Records**:
   - Query tables directly using the client:
     ```javascript
     const { data: challenges } = await supabase.from('challenges').select('*');
     ```
   - Execute the reward redemption atomic RPC function:
     ```javascript
     const { data: success, error } = await supabase.rpc('redeem_reward', {
       p_user_id: user.id,
       p_reward_id: reward.id
     });
     ```
