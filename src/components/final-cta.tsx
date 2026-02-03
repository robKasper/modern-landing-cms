"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform how your team works?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Join 10,000+ teams shipping faster with TaskFlow
          </p>

          <Button size="lg" className="text-lg px-8 py-6">
            Start Free Trial
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
