import { Link } from "react-router-dom";
export function NoPostsFound() {
  return (
    <main class="flex h-full w-full flex-col items-center justify-center bg-dark-200">
      <h1 class="text-9xl font-extrabold tracking-widest text-white">Uh oh!</h1>
      <div class="absolute rotate-12 rounded bg-primary px-2 text-sm">
        No Posts found
      </div>
      <button class="mt-5">
        <Link to="/explore" class="group relative inline-block text-sm font-medium text-primary focus:outline-none focus:ring ">
          <span class="absolute inset-0 rounded-2xl translate-x-0.5 translate-y-0.5 bg-primary transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span class="relative rounded-2xl block border border-current bg-dark-200 px-8 py-3">
            Explore
          </span>
        </Link>
      </button>
    </main>
  );
}
