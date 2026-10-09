import Image from "next/image";
import Link from "next/link";
import { oswald } from "../fonts";

const WorkoutCard = ({ workout }) => (
  <Link
    href={`/workouts/${workout.id}`}
    className="group block overflow-hidden rounded-lg border border-white/10 bg-[#11130d] transition-colors hover:border-[#C2F800]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]"
  >
    <article>
      <div className="relative overflow-hidden bg-[#1a1c16]">
        <Image
          src={workout.image}
          alt={workout.name}
          width={740}
          height={480}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex min-h-7 flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-[#C2F800] bg-[#C2F800] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#10110B]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3
          className={`${oswald.className} mt-3 min-h-10 text-base leading-5 font-extrabold uppercase text-white sm:text-lg`}
        >
          {workout.name}
        </h3>
        <p className="mt-0.5 truncate text-sm text-gray-400">
          {workout.equipment}
        </p>

        <div className="mt-4 grid grid-cols-3 border-t border-white/10 pt-3 text-xs text-gray-300">
          <span className="flex items-center gap-1.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 shrink-0 text-[#C2F800]"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 7v5l3 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center justify-center gap-1.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 shrink-0 text-[#C2F800]"
            >
              <path
                d="M13.5 3.5c.7 3-2.7 3.8-1.8 6.3.4 1.1 1.6 1.6 2.5 1.1 1.2-.7 1.3-2 1.2-3.1 2.3 1.8 3.7 4.1 3.7 6.4a7.1 7.1 0 1 1-14.2 0c0-3.7 2.4-7.2 6.2-10.7-.2 2.3.4 3.5 1.5 4.1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center justify-end gap-1.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 shrink-0 text-[#C2F800]"
            >
              <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.4l6.3-.9L12 2.8Z" />
            </svg>
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  </Link>
);

export default WorkoutCard;
