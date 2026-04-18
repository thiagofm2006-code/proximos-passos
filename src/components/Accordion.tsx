import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  items: Item[];
};

export function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden"
          >
            <button
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-900">
                {item.title}
              </span>

              <span className="text-gray-400">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {/* 👇 AQUI ESTÁ A MUDANÇA */}
                  <div className="px-5 pb-4 pt-3 space-y-3 text-sm text-gray-600 
                                  bg-gradient-to-b from-purple-50/40 to-blue-50/30">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}