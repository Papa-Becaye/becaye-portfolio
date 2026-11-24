---
title: "From idea to production: what Tabaxbi taught me"
excerpt: "Building a SaaS platform for construction is not just about writing React and an API. It is about connecting users, data and real-world constraints."
category: "fullstack"
date: "2026-10-18"
readTime: "7"
cover: "/images/blog/fullstack.svg"
tags: ["Full Stack", "SaaS", "Architecture"]
featured: true
---

## The starting point

Tabaxbi started with a simple observation: on a construction site, information travels between too many people and too many channels. Clients, supervisors, companies and suppliers do not share the same space. The product had to become a common ground before becoming software.

I chose a stack I could evolve without overcomplicating it: React and Vite for the interface, Redux for shared state, Node.js and Express for the API, Prisma and PostgreSQL for data, then Docker and Traefik for deployment.

## What full stack changes

Working across the whole chain leads to better decisions. When I model a table, I already think about the screen that will display it. When I design a page, I know which data must be aggregated on the server.

- A responsive interface cannot compensate for a poorly designed API.
- A slow query is always felt in the user experience.
- Deployment is part of the product, not a final step.

> A digital product is finished only when it is understood, used and maintainable.

## What I would do differently

I would validate journeys with real construction professionals earlier. The technology was ready, but reading the progress of a site still needed several rounds of feedback. That is probably the most useful lesson: code is written quickly, understanding the domain takes longer.

Today, Tabaxbi remains a permanent learning ground. I am exploring document-management automation and a measured use of AI to help summarise site information.
