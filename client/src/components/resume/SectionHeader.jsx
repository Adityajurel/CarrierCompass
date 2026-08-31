function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6 mt-10">

      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {subtitle}
      </p>

      <div className="mt-4 h-px w-full bg-slate-800"></div>

    </div>
  );
}

export default SectionHeader;