import { motion } from "framer-motion";

type Props = {
  state: "idle" | "loading" | "done";
  mode?: "floating" | "corner";
};

export function ThinkingOrb({ state, mode = "corner" }: Props) {
  const expressions = {
    idle: "😕",
    loading: "🤔",
    done: "😌",
  };

  const position =
    mode === "floating"
      ? "fixed top-24 right-16"
      : "fixed bottom-10 right-10";

  return (
    <motion.div
      className={`pointer-events-none ${position} z-10`}
      animate={
        state === "loading"
          ? { scale: [1, 1.08, 1] }
          : { scale: 1 }
      }
      transition={{
        duration: 1.2,
        repeat: state === "loading" ? Infinity : 0,
      }}
    >
      <div className="w-20 h-20 rounded-full 
        bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent 
        border border-purple-200 
        flex items-center justify-center text-xl
        shadow-[0_0_40px_rgba(168,85,247,0.25)]"
      >
        {expressions[state]}
      </div>
    </motion.div>
  );
}