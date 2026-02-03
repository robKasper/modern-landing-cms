"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Create Your Workspace",
    description:
      "Sign up and invite your team. Set up your first project in under 60 seconds.",
  },
  {
    number: "2",
    title: "Organize Your Work",
    description:
      "Create boards for different projects. Add tasks, assign team members, and set due dates.",
  },
  {
    number: "3",
    title: "Collaborate & Ship",
    description:
      "Track progress in real-time. Use comments and @mentions to keep everyone aligned. Ship faster.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Get started in minutes, not weeks
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
