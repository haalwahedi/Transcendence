"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div key={"1"} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
        <ToastContainer />
      </motion.div>
    </AnimatePresence>
  );
}
