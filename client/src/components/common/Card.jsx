function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;