import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-dark-200">
      <h1 className="text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-primary px-2 text-sm">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link
          to="/home"
          className="group relative inline-block text-sm font-medium text-primary focus:outline-none focus:ring "
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-2xl bg-primary transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block rounded-2xl border border-current bg-dark-200 px-8 py-3">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
}
