export function SkeletonLoader() {
  return (
    <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow">
      <div class="flex animate-pulse space-x-4">
        <div class="h-10 w-10 rounded-full bg-slate-700"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 rounded bg-slate-700"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 rounded bg-slate-700"></div>
              <div class="col-span-1 h-2 rounded bg-slate-700"></div>
            </div>
            <div class="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
