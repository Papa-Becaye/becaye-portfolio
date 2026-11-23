# Portfolio — Bécaye FALL

Portfolio dark premium, multilingue (FR / EN / AR avec RTL), construit avec
**Next.js (App Router) · React · JavaScript · Tailwind CSS 4 · Framer Motion · Lucide · i18next / react-i18next**.

> **Note d'architecture** — L'environnement fourni est un projet Next.js : le portfolio y est donc
> développé (100 % JavaScript, sans TypeScript dans le code applicatif) plutôt qu'avec Vite.
> Next.js apporte en plus les URLs localisées `/fr` `/en` `/ar` prérendues en statique, le SEO par langue
> et la route API du formulaire. Le dossier « pages » prévu est nommé `src/screens/`
> car `src/pages` est réservé par Next.js.

## Direction artistique
- Palette : `#0B0B0F` · `#121219` · `#191922` · accent `#62FF4A` (hover `#83FF70`) · texte `#F5F5F7` / `#92929E` · bordures `#292933`
- Typo : **Clash Display** (titres, auto-hébergée dans `public/fonts`, source Fontshare / ITF Free Font License), **Inter** (texte), **JetBrains Mono** (labels techniques), **IBM Plex Sans Arabic** (arabe)
- Hero : fenêtre d'éditeur de code animée + schéma d'architecture UI → API → DB → VPS

## Installation & lancement
```bash
npm install
cp .env.example .env      # puis renseigner vos valeurs
npm run dev               # http://localhost:3000  → redirige vers /fr
```
Build de production Next.js (VPS / Docker) :
```bash
npm run build:next && npm run start
```

Build Cloudflare Workers (OpenNext) : `npm run build` produit `.open-next/`, puis
`npx wrangler deploy` déploie ce bundle. C'est la commande à utiliser comme
**Build command** dans Workers Builds.

## Personnaliser (variables à renseigner)
Tout est centralisé dans **`src/data/site.js`** (valeurs vides = masquées, aucun faux lien) et peut être piloté par `.env` :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, hreflang, Open Graph) |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `_PHONE`, `NEXT_PUBLIC_WHATSAPP` | Contacts |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL` | Réseaux |
| `NEXT_PUBLIC_CV_FR/EN/AR` | PDF du CV (déposés dans `public/cv/`). Sans CV, le bouton devient « Demander mon CV » (→ Contact) |
| `NEXT_PUBLIC_PHOTO` | Photo (`public/images/…`). Sans photo : monogramme |
| `NEXT_PUBLIC_AVAILABILITY` | `available` · `limited` · `unavailable` |

> Les variables `NEXT_PUBLIC_*` sont injectées **au build** : relancer un build après modification.

### Contenu
- Textes : `src/locales/{fr,en,ar}/translation.json` (les mots entre `*astérisques*` des titres sont accentués en vert)
- Projets : `src/data/projects.js` + textes sous `projects.items.<key>` dans chaque langue. Une page détail `/{lang}/projects/{slug}` est générée automatiquement. Ajoutez `image` pour afficher une vraie capture (sinon : composition graphique abstraite, étiquetée « aperçu graphique »).
- Parcours : `src/data/experiences.js` (aucune date inventée : `dates: null` affiche la durée traduite)
- Compétences : `src/data/skills.js` · Navigation : `src/data/navigation.js` · Langues : `src/i18n/languages.js`

## Formulaire de contact
`POST /api/contact` — validation côté client **et** serveur, honeypot, limitation de débit, états de chargement / erreur / succès.
Un succès n'est affiché **que si le message a réellement été livré**. Canaux (par priorité) :
1. **Resend** : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
2. **Webhook / Formspree** : `CONTACT_FORM_ENDPOINT`
3. **PostgreSQL** : `DATABASE_URL` (table `contact_messages`, `npx drizzle-kit push`)

Aucun canal configuré → l'API répond 503 et le site affiche un message d'erreur honnête avec l'email de secours.

## i18n / SEO
- URLs `/fr`, `/en`, `/ar` (défaut : français), `<html lang dir>` rendus côté serveur, hreflang + canonical, métadonnées traduites, `sitemap.xml`, `robots.txt`, Open Graph / Twitter, JSON-LD `Person`, favicon SVG.
- Sélecteur FR/EN/AR : navigation client instantanée, langue mémorisée dans `localStorage`.
- Arabe : RTL réel (propriétés logiques Tailwind), police IBM Plex Sans Arabic, espacement de lettres désactivé, emails/URLs/code/technologies isolés en LTR.
- `prefers-reduced-motion` respecté (Framer Motion `reducedMotion="user"` + CSS).

## Déploiement VPS (Docker + Traefik)
```bash
# sur le VPS, avec un réseau Traefik externe nommé "traefik"
cp .env.example .env            # renseigner les variables
DOMAIN=votre-domaine.com docker compose up -d --build
```
Le `Dockerfile` multi-stage produit une image Node `standalone` minimale (utilisateur non-root, healthcheck sur `/api/health`).
Le `docker-compose.yml` contient les labels Traefik (HTTPS, Let's Encrypt via le resolver `letsencrypt` — adaptez le nom à votre configuration).
Pour un déploiement hors Docker : `npm run build:next && npm run start` derrière Nginx en reverse proxy vers le port 3000.
Aucun secret n'est présent dans le code source.
