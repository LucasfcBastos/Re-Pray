# RE-PRAY

O **RE-PRAY** é um sistema desenvolvido para auxiliar instituições evangélicas no gerenciamento de pedidos de oração.

A solução tem como objetivo centralizar os registros, evitar perda de informações e fornecer dados estratégicos para apoio à tomada de decisão da capelania.

O sistema é dividido em duas plataformas principais:

- Uma aplicação **desktop** destinada à equipe da capelania, permitindo visualizar, organizar e acompanhar os pedidos de oração por meio de dashboards e tabelas de gerenciamento;
- Uma aplicação **web** voltada aos estudantes, contendo um formulário online simples e acessível para envio dos pedidos de oração.

---

# TECNOLOGIAS

## Frontend
- React
- Vite
- Electron
- React Router DOM

## Backend
- Flask API
- PostgreSQL

## Cloud / Deploy
- Supabase
- Render
- Vercel

---

# ESTRUTURA DO PROJETO

```bash
RE-PRAY/
│
├── backend/
│
├── frontend/
│   ├── desk-app-dash/
│   └── mobi-web-form/
```

---

# INSTALAÇÃO

# FRONTEND

## Mobi-Web-Form

```bash
cd frontend/mobi-web-form/

npm install
npm install react-router-dom
```

---

## Desk-App-Dash

```bash
cd frontend/desk-app-dash/

npm install

npm install react-router-dom jspdf html2canvas node-machine-id @supabase/supabase-js

npm install electron concurrently wait-on electron-builder qrcode.react --save-dev
```

Depois, crie um arquivo `.env`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

# BACKEND

Execute os comandos:

```bash
cd backend/

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

Depois, crie um arquivo `.env`:

```env
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET_KEY=
```

---

# CONFIGURAÇÃO DO SUPABASE

Crie um novo projeto no Supabase e execute a seguinte query SQL:

```sql
CREATE TABLE public.cursos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nome text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cursos_pkey PRIMARY KEY (id)
);

CREATE TABLE public.dispositivo (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  id_references uuid NOT NULL,
  identificador text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dispositivo_pkey PRIMARY KEY (id),
  CONSTRAINT dispositivo_id_references_fkey FOREIGN KEY (id_references) REFERENCES auth.users(id)
);

CREATE TABLE public.instituicoes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  id_references uuid,
  nome text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT instituicoes_pkey PRIMARY KEY (id),
  CONSTRAINT instituicoes_id_references_fkey FOREIGN KEY (id_references) REFERENCES auth.users(id)
);

CREATE TABLE public.pedidos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  id_references uuid NOT NULL,
  id_cursos uuid NOT NULL,
  descricao text NOT NULL,
  status text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pedidos_pkey PRIMARY KEY (id),
  CONSTRAINT pedidos_id_references_fkey FOREIGN KEY (id_references) REFERENCES public.instituicoes(id),
  CONSTRAINT pedidos_id_cursos_fkey FOREIGN KEY (id_cursos) REFERENCES public.cursos(id)
);

CREATE TABLE public.usuario (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  id_references uuid NOT NULL,
  nome text NOT NULL,
  senha text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT usuario_pkey PRIMARY KEY (id),
  CONSTRAINT usuario_id_references_fkey FOREIGN KEY (id_references) REFERENCES auth.users(id)
);
```

---

# CRIANDO UMA INSTITUIÇÃO

Execute a query abaixo para cada instituição cadastrada:

```sql
DO $$
DECLARE
    novo_id UUID;
BEGIN

    -- Gera UUID único
    novo_id := gen_random_uuid();

    -- AUTH.USERS
    INSERT INTO auth.users (
        id,
        is_sso_user,
        is_anonymous
    )
    VALUES (
        novo_id,
        false,
        false
    );

    -- INSTITUIÇÃO
    INSERT INTO instituicoes (
        id,
        id_references,
        nome
    )
    VALUES (
        gen_random_uuid(),
        novo_id,
        ''
    );

END $$;
```

---

# CRIANDO USUÁRIOS

Execute para cada usuário da instituição:

```sql
INSERT INTO usuario (
    id,
    id_references,
    nome,
    senha
)
VALUES (
    gen_random_uuid(),
    '',
    '',
    crypt('', gen_salt('bf'))
);
```

---

# REGISTRANDO DISPOSITIVOS

Execute para cada dispositivo autorizado:

```sql
INSERT INTO dispositivo (
    id,
    id_references,
    identificador
)
VALUES (
    gen_random_uuid(),
    '',
    ''
);
```

---

# EXECUÇÃO

# FRONTEND

## Desk-App-Dash

```bash
cd frontend/desk-app-dash/

npm run desktop
```

---

## Mobi-Web-Form

O formulário web deve ser hospedado na Vercel:

[LINK DO VERCEL](https://vercel.com/)

Após o deploy, ajuste os links da API nos arquivos:

```bash
frontend/mobi-web-form/src/pages/ViewForm.jsx
frontend/desk-app-dash/src/pages/QrCode.jsx
```

---

# BACKEND

Hospede a API Flask no Render:

[LINK DO RENDER](https://render.com/)

Depois execute:

```bash
cd backend/

source venv/bin/activate

python run.py
```