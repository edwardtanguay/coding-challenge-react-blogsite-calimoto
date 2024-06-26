# Coding Challenge for Calimoto
**By Edward Tanguay, June 2024**

This application is a coding challenge that I created for the company Calimoto.

Live site is online here: https://coding-challenge-react-blogsite-calimoto.vercel.app 

![reactccdemo](https://github.com/edwardtanguay/coding-challenge-react-blogsite-calimoto/assets/446574/d0c97f1b-567b-4b31-a437-acffc4196d14)

## features

- Vite
- React
- React Router 6.4 with createBrowserRouter
- TypeScript
- Sass
- day.js
- JSON data source
- ESLint
- Prettier

## prequisites

- Windows / macOS / Linux
- Node
  - created on v20.10.0
  - tested on v16.18.1
- to change port:
  - **package.json**, line 7
  - `"dev": "vite --port 3010 --open",`
    
## setup

- clone repository
- `npm i`
- `npm run dev`

## purpose of site

- mock blog site
- user can view, delete and create blog entries
- changes are not saved, i.e. erased on browser refresh

## design and layout

- responsive
- colors kept minimal to focus on functionality
- tested on
  - Windows 10: Chrome, Firefox, Opera, Edge
  - Ubuntu 22.04: Chrome, Firefox
  - Samsung A52s: Chrome, Samsung browser
  - iPhone 13: Safari, Chrome

![grafik](https://github.com/edwardtanguay/coding-challenge-react-blogsite-calimoto/assets/446574/df3707dc-5478-4b2d-b941-8de249e46b4f)

## coding highlights

- form interactivity and validation handled by **custom class**, `FormManager.tsx`
- **useContext** ensures central state management
- **TypeScript** used exclusively
  - **return types** defined on functions
- form uses **accessibility** features `fieldset`, `legend`, `htmlFor`
- item ids are *short UUIDs*, i.e. 6-digit random alphanumeric characters, e.g. `34GHs2`
- `tools.ts` contain all helper functions

## development

- total time and project progress: see GitHub log
  - most commit messages clear and description
- VSCode with Vim extension
- ChatGPT occasionally, but no Copilot
- TypeScript, ESLint, Prettier

## feature backlog

- nnn


