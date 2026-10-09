const API_URL =
  process.env.WORKOUTS_API_URL || "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const response = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`Workout API returned ${response.status}`);
  }

  const workouts = await response.json();
  if (!Array.isArray(workouts)) {
    throw new Error("Workout API returned an invalid response");
  }

  return workouts;
}

export async function getWorkout(id) {
  const workouts = await getWorkouts();
  return workouts.find((workout) => String(workout.id) === String(id)) ?? null;
}
