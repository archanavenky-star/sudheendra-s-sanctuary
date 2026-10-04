const LoadingState = ({ label = "Loading…" }: { label?: string }) => (
  <div className="py-20 text-center text-sm text-muted-foreground font-body">{label}</div>
);
export default LoadingState;
