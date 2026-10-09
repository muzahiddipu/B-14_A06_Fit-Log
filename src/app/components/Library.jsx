import WorkoutCard from "./WorkoutCard";
import { getWorkouts } from "../lib/workouts";

const Library = async () => {
  let workouts = [];
  let hasError = false;

  try {
    workouts = await getWorkouts();
  } catch {
    hasError = true;
  }

  return (
    <section
      id="workouts"
      className="bg-[#0a0a0a] px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-extrabold uppercase sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          {!hasError && (
            <p className="text-sm text-gray-400">{workouts.length} workouts</p>
          )}
        </div>

        {hasError ? (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-6 text-gray-300">
            We couldn&apos;t load the workout library. Please try again later.
          </p>
        ) : workouts.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-6 text-gray-300">
            No workouts are available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Library;
