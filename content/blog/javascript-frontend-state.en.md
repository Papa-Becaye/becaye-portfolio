---
title: "JavaScript in 2026: write less, understand more"
excerpt: "Frameworks change, but fundamentals remain. A short note on where I put state, when I split modules and why simplicity is still the best tool."
category: "javascript"
date: "2026-09-30"
readTime: "5"
cover: "/images/blog/javascript.svg"
tags: ["JavaScript", "React", "Frontend"]
featured: false
---

## The state reflex

I often see components storing everything in a global state. It is convenient at first, then hard to maintain. My rule is simple: state stays where it is used, and only moves up when several components genuinely need it.

1. Local state for an isolated interaction.
2. Shared state for consistency across several views.
3. Server data for anything that must be persisted.

## Understand before optimising

The browser is already very good. Before adding a library or a cache, I measure. Most of the time, the gain comes from an avoided render, a better query or a virtualised list — not from a new tool.

> Performance is a consequence of good decisions, not a layer added at the end.

## One habit that pays off

I reread my code six months later. If I cannot immediately explain why an abstraction exists, it is probably unnecessary. Writing less code and naming things well remains the most reliable advice I can give a frontend developer.
