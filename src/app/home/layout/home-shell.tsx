export function HomeShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-full">
      <div className="mx-auto w-full max-w-5xl px-2  sm:px-6 lg:max-w-7xl lg:px-3 xl:px-8">
        <div className="relative">
          <div className="flex min-h-full px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
