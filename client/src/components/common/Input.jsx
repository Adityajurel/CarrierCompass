function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
      />

      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Input;