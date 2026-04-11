# 🎓 HOLO TUTO — Homepage React

> L'accompagnement scolaire intelligent à la maison.  
> Site vitrine / landing page de conversion — React 18 + Vite + Tailwind CSS

---

## 📋 À propos

**HOLO TUTO** est une plateforme IA d'accompagnement éducatif pour les élèves du primaire et du secondaire. Cette homepage est conçue pour convertir les visiteurs (parents, écoles, enseignants) en essais gratuits et demandes de démo.

---

## 🎨 Charte Graphique

| Token | Couleur | Usage |
|---|---|---|
| `--ht-blue`  | `#156EDC` | Logo "HOLO", liens, CTAs secondaires |
| `--ht-green` | `#3FB54A` | Logo "TUTO", CTA primaire, validations |
| `--ht-cyan`  | `#5CE1E6` | Titres accent, icônes |
| `--ht-navy`  | `#1A3A6B` | Titres H2/H3, textes foncés |
| `--ht-text`  | `#4F5262` | Corps de texte |

**Polices :** Montserrat (titres, logo, CTAs) + Nunito (corps)

---

## 🏗️ Structure des sections

| # | Section | Objectif |
|---|---|---|
| 1 | **Hero** | Déclic immédiat, CTA principal |
| 2 | **Problème** | Empathie parent ("on vit ça") |
| 3 | **Solution** | Présenter les 3 piliers |
| 4 | **Comment ça fonctionne** | 4 étapes rassurantes |
| 5 | **IA Différenciateur** | Chat animé, pas un chatbot |
| 6 | **Résultats** | Preuves visibles de progrès |
| 7 | **Gamification** | Engagement enfant, fun |
| 8 | **Parents** | Bénéfices émotionnels |
| 9 | **Écoles** | Crédibilité institutionnelle |
| 10 | **FAQ** | Lever les objections |
| 11 | **CTA Final** | Conversion ultime |

---

## 🚀 Installation & Démarrage

```bash
# Cloner le dépôt
git clone https://github.com/votre-org/holotuto-homepage.git
cd holotuto-homepage

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
# → http://localhost:5173

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 📦 Stack Technique

```
React 18.3          → UI framework
Vite 5.4            → Build tool & dev server
Tailwind CSS 3.4    → Utility-first CSS
Framer Motion 11    → Animations (optionnel)
Lucide React        → Icônes SVG
Headless UI 2       → Accordion FAQ
```

---

## 📁 Architecture

```
src/
├── App.jsx                      # Composition des sections
├── index.css                    # Variables CSS + Tailwind
├── main.jsx                     # Point d'entrée React
├── components/
│   ├── Navbar.jsx               # Navigation sticky + mobile
│   ├── WaveDivider.jsx          # Séparateurs SVG entre sections
│   └── Footer.jsx               # Pied de page complet
└── sections/
    ├── HeroSection.jsx          # S1 — Hero
    ├── ProblemSection.jsx       # S2 — Problème
    ├── SolutionSection.jsx      # S3 — Solution
    ├── HowItWorksSection.jsx    # S4 — Comment ça fonctionne
    ├── AISection.jsx            # S5 — IA différenciateur
    ├── ResultsSection.jsx       # S6 — Résultats
    ├── GamificationSection.jsx  # S7 — Gamification
    ├── ParentsSection.jsx       # S8 — Parents
    ├── SchoolsSection.jsx       # S9 — Écoles
    ├── FAQSection.jsx           # S10 — FAQ
    └── CTAFinalSection.jsx      # S11 — CTA final
```

---

## 🔧 Personnalisation

### Remplacer les images placeholder

Les images proviennent d'Unsplash (CDN public). Pour la production, remplacez les URLs dans chaque section par vos propres visuels :

```jsx
// Exemple dans HeroSection.jsx
<img src="https://votre-cdn.com/hero-enfant.jpg" alt="..." />
```

### Modifier les couleurs

Éditez `src/index.css` (variables CSS) et `tailwind.config.js` (tokens Tailwind) :

```css
/* src/index.css */
:root {
  --ht-green: #3FB54A; /* Modifier ici */
}
```

### Activer les animations Framer Motion

```bash
npm install framer-motion
```

Puis dans chaque section :

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* contenu */}
</motion.div>
```

---

## 📱 Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile (<640px) | Stack vertical, CTA full-width, menu burger |
| Tablet (640–1024px) | 2 colonnes max, sections condensées |
| Desktop (>1024px) | Layout 2 colonnes, grands espaces |

---

## 🌐 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Déployer le dossier dist/
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Ajouter dans package.json :
# "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

## 📄 Licence

© 2025 HOLO TUTO. Tous droits réservés.

---

## 🤝 Skill HoloTuto React

Ce projet a été généré avec la compétence `holotuto-fullstack-react`.  
Fichier skill : `../holotuto-skill/SKILL.md`
