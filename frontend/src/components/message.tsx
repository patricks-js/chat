export function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 rounded-lg bg-background w-max p-2 max-w-[500px]">
      <p className="text-sm font-medium text-foreground break-words">
        {children}
      </p>
    </div>
  );
}
