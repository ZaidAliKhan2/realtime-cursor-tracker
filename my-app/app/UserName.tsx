"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserName = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleClick = () => {
    router.push(`/trackCursor?user=${encodeURIComponent(username)}`); 
  };
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none hover:bg-slate-50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder-slate-500 dark:hover:bg-slate-900/50 dark:focus:border-indigo-500 dark:focus:bg-slate-950 dark:focus:ring-indigo-950/50"
      />
      <button
        onClick={handleClick}
        className="w-full cursor-pointer rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.99]"
      >
        Track Cursor
      </button>
    </div>
  );
};

export default UserName;
