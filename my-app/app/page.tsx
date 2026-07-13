import UserName from "./UserName";

export default function TrackCursorContainer() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-950">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 dark:bg-slate-900 dark:shadow-none dark:border-slate-800/80">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Welcome to Tracker
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enter your details to begin tracking
          </p>
        </div>

        {/* Form Elements */}
        <UserName></UserName>
      </div>
    </div>
  );
}
