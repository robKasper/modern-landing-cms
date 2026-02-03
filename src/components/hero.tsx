"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Project Management That Actually Works
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Stop juggling tools. TaskFlow brings tasks, time tracking, and team
            collaboration into one beautiful workspace.
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial
          </p>
        </motion.div>

        {/* Right Column - Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 aspect-video flex items-center justify-center"
        >
          <div className="text-center text-gray-400">
            [Dashboard Screenshot Placeholder]
            <p className="text-sm mt-2">Add screenshot or mockup here</p>
          </div>
        </motion.div>
      </div>

      {/* Social Proof Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 text-center"
      >
        <p className="text-sm text-gray-500 mb-8">
          Trusted by 10,000+ remote teams worldwide
        </p>
        <div className="flex justify-center items-center gap-12 opacity-40">
          {/* Add company logos here - for now, placeholder text */}
          <div className="text-2xl font-bold">COMPANY</div>
          <div className="text-2xl font-bold">BRAND</div>
          <div className="text-2xl font-bold">STARTUP</div>
          <div className="text-2xl font-bold">TECH</div>
          <div className="text-2xl font-bold">AGENCY</div>
        </div>
      </motion.div>
    </section>
  );
}
