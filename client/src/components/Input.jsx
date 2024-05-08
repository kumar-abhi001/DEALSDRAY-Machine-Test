export function Input({ type, placeholder, value, label, onChange }) {
  return (
    <div className="mb-3 flex flex-col">
      <label className="font-[500]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border-2 rounded-3xl h-11 w-[466.4px] p-3 text-black mt-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
