# FitLog

FitLog is a workout library and lightweight training planner. Browse exercises, review their details, build a plan for today, and save workouts to revisit later.

## Technologies

- Next.js 16 with the App Router
- React 19
- Tailwind CSS 4 and daisyUI
- React Icons
- React Toastify
- Browser `localStorage` for saved workouts and today's plan

## Key Features

1. **Workout library** — Browse workouts with exercise details, muscle groups, and key stats.
2. **Workout detail pages** — View exercise instructions, equipment, difficulty, sets, reps, duration, calories, and rating.
3. **Today's plan** — Add up to five workouts, track total exercises, minutes, and calories, and mark workouts as done.
4. **Saved workouts** — Save workouts for later and manage them separately from today's plan.
5. **Sorting and feedback** — Sort the current list by duration, calories, or rating, with themed notifications for workout actions.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

FitLog is a Next.js application, so Vercel can detect and build it with the default Next.js settings.

1. Push the project to a Git provider supported by Vercel.
2. In Vercel, choose **Add New → Project** and import the FitLog repository.
3. Keep the detected Next.js framework and default build settings (`npm run build`).
4. Select Node.js 20.x or later and deploy.

The workout library and detail pages use the external API at `https://api.abcz.workers.dev/api/fitlog`. If you have a compatible API endpoint, you can override it by adding `WORKOUTS_API_URL` in **Project Settings → Environment Variables** in Vercel. The API must return the workout data in the format expected by the app. Redeploy after changing environment variables.

Plan and saved workouts are stored in browser `localStorage`. They persist across reloads in the same browser, but are not synced across devices or accounts.

## Available Scripts

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve the production build
```
