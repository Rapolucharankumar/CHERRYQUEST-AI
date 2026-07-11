import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" />
      </div>
      <div className="relative z-10">
        <SignUp appearance={{ elements: { formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500", card: "bg-zinc-950 border border-zinc-800" } }} />
      </div>
    </div>
  );
}
