---
title: "JavaScript en 2026 : écrire moins, comprendre mieux"
excerpt: "Les frameworks changent, mais les fondamentaux restent. Petit retour sur la manière dont je décide où placer l'état, quand modulariser et pourquoi la simplicité reste le meilleur outil."
category: "javascript"
date: "2026-09-30"
readTime: "5"
cover: "/images/blog/javascript.svg"
tags: ["JavaScript", "React", "Frontend"]
featured: false
---

## Le réflexe du state

Je vois souvent des composants qui stockent tout dans un état global. C'est pratique au début, puis difficile à maintenir. Ma règle est simple : l'état reste là où il est utilisé, et ne monte qu'au niveau où plusieurs composants en ont réellement besoin.

1. État local pour une interaction isolée.
2. État partagé pour une cohérence entre plusieurs vues.
3. Données serveur pour tout ce qui doit être persisté.

## Comprendre avant d'optimiser

Le navigateur est déjà très bon. Avant d'ajouter une bibliothèque ou un cache, je mesure. Le plus souvent, le gain vient d'un rendu évité, d'une requête mieux formulée ou d'une liste virtualisée — pas d'un nouvel outil.

> La performance est une conséquence des bonnes décisions, pas une couche à ajouter à la fin.

## Une habitude qui porte ses fruits

Je relis mon code six mois plus tard. Si je ne comprends pas immédiatement pourquoi une abstraction existe, elle est probablement inutile. Écrire moins de code et mieux le nommer reste le conseil le plus fiable que je puisse donner à un développeur frontend.
