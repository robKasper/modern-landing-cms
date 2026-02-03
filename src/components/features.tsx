"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { FiGrid, FiUsers, FiClock, FiZap } from "react-icons/fi";

const features = [
  {
    icon: FiGrid,
    title: "Visual Kanban Boards",
    description:
      "Organize work visually with customizable boards, lists, and cards. Drag and drop tasks between columns as work progresses.",
  },
  {
    icon: FiUsers,
    title: "Real-Time Collaboration",
    description:
      "See who's working on what in real-time. Comment, @mention teammates, and get instant notifications when things change.",
  },
  {
    icon: FiClock,
    title: "Time Tracking",
    description:
      "Track time spent on tasks with one-click timers. Generate detailed reports to understand where your team's time goes.",
  },
  {
    icon: FiZap,
    title: "Smart Integrations",
    description:
      "Connect with the tools you already use. Sync with Slack, GitHub, Google Drive, and 50+ other popular apps.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything your team needs to succeed
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features that help remote teams collaborate and ship faster
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
