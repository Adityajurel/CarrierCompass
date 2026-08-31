function Select({
  label,
  register,
  error,
  options = [],
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>

      <select
        {...register}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Select;