export function Message({ children, user }: { children: React.ReactNode, user: string }) {
  return (
    <div className="bg-slate-100 rounded-lg bg-background w-max p-2 max-w-[500px]">
      <p className="text-sm font-medium text-foreground break-words">
        <strong>{user}:</strong> {children}
      </p>
    </div>
  );
}
