import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/WorkoutActions";
import { getWorkout } from "../../lib/workouts";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#0a0a0a] px-4 py-8 text-white sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#workouts"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-[#C2F800]"
        >
          <span aria-hidden="true">←</span> Back to workouts
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#151710] sm:aspect-[1.1/1] lg:aspect-[0.78/1]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="py-1">
            <h1 className="text-3xl leading-tight font-extrabold uppercase sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-[#C2F800] bg-[#C2F800] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#10110B]"
                >
                  {group}
                </span>
              ))}
            </div>

            <section aria-labelledby="workout-specs" className="mt-5">
              <h2 id="workout-specs" className="sr-only">
                Key specs
              </h2>
              <dl className="overflow-hidden rounded-xl border border-white/10 bg-[#171a22]">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex min-h-10 items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-2.5 last:border-b-0"
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      {label}
                    </dt>
                    <dd className="text-right text-xs font-medium text-gray-200 sm:text-sm">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="workout-instructions" className="mt-8">
              <h2
                id="workout-instructions"
                className="text-xs font-extrabold uppercase tracking-wide text-white"
              >
                Instructions
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-xs leading-5 text-gray-300 sm:text-sm">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="marker:text-gray-400"
                  >
                    <span className="ml-2">{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-6 border-t border-white/10 pt-5">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
