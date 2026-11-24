---
title: "De l'idée à la production : ce que Tabaxbi m'a appris"
excerpt: "Construire une plateforme SaaS pour le BTP, ce n'est pas seulement écrire du React et une API. C'est apprendre à relier des utilisateurs, des données et des contraintes réelles."
category: "fullstack"
date: "2026-10-18"
readTime: "7"
cover: "/images/blog/fullstack.svg"
tags: ["Full Stack", "SaaS", "Architecture"]
featured: true
---

## Le point de départ

Tabaxbi est née d'un constat simple : sur un chantier, l'information circule entre trop de personnes et trop de canaux. Clients, superviseurs, entreprises et fournisseurs ne partagent pas le même espace. Le produit devait donc être un lieu commun avant d'être un logiciel.

J'ai choisi une stack que je pouvais faire évoluer sans la compliquer : React et Vite côté interface, Redux pour l'état partagé, Node.js et Express pour l'API, Prisma et PostgreSQL pour les données, puis Docker et Traefik pour le déploiement.

## Ce que le full stack change

Travailler sur toute la chaîne permet de prendre de meilleures décisions. Quand je modélise une table, je pense déjà à l'écran qui l'affichera. Quand je dessine une page, je sais quelles données devront être agrégées côté serveur.

- Une interface réactive ne compense pas une API mal pensée.
- Une requête lente se ressent toujours dans l'expérience utilisateur.
- Le déploiement fait partie du produit, pas d'une étape finale.

> Un produit numérique n'est terminé que lorsqu'il est compris, utilisé et maintenable.

## Ce que je ferais autrement

Je commencerais par valider plus tôt les parcours avec de vrais utilisateurs du BTP. La technique était prête, mais la lecture de l'avancement d'un chantier méritait encore des allers-retours. C'est probablement la leçon la plus utile : le code s'écrit vite, la compréhension du métier prend plus de temps.

Aujourd'hui, Tabaxbi reste un terrain d'apprentissage permanent. J'y explore notamment l'automatisation de la gestion documentaire et l'usage mesuré de l'IA pour aider à synthétiser l'information de chantier.
