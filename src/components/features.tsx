"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiUsers,
  FiClock,
  FiZap,
  FiCheck,
  FiStar,
  FiShield,
  FiSettings,
  FiBarChart2,
  FiGlobe,
} from "react-icons/fi";
import { IconType } from "react-icons";

interface Feature {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

const iconMap: Record<string, IconType> = {
  grid: FiGrid,
  users: FiUsers,
  clock: FiClock,
  zap: FiZap,
  check: FiCheck,
  star: FiStar,
  shield: FiShield,
  settings: FiSettings,
  chart: FiBarChart2,
  globe: FiGlobe,
};

// Fallback data for when CMS is empty
const fallbackFeatures: Feature[] = [
  {
    _id: "1",
    icon: "grid",
    title: "Visual Kanban Boards",
    description:
      "Organize work visually with customizable boards, lists, and cards. Drag and drop tasks between columns as work progresses.",
    order: 0,
  },
  {
    _id: "2",
    icon: "users",
    title: "Real-Time Collaboration",
    description:
      "See who's working on what in real-time. Comment, @mention teammates, and get instant notifications when things change.",
    order: 1,
  },
  {
    _id: "3",
    icon: "clock",
    title: "Time Tracking",
    description:
      "Track time spent on tasks with one-click timers. Generate detailed reports to understand where your team's time goes.",
    order: 2,
  },
  {
    _id: "4",
    icon: "zap",
    title: "Smart Integrations",
    description:
      "Connect with the tools you already use. Sync with Slack, GitHub, Google Drive, and 50+ other popular apps.",
    order: 3,
  },
];

function FeatureSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-muted rounded mb-4" />
          <div className="h-6 bg-muted rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded w-full mb-1" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </CardHeader>
    </Card>
  );
}

export function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "feature"] | order(order asc) {
            _id,
            title,
            description,
            icon,
            order
          }
        `);
        setFeatures(data.length > 0 ? data : fallbackFeatures);
      } catch (err) {
        console.error("Failed to fetch features:", err);
        setFeatures(fallbackFeatures);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-display">
            Everything your team needs to succeed
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features that help remote teams collaborate and ship faster
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <>
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
            </>
          ) : (
            features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || FiZap;
              return (
                <motion.div
                  key={feature._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary/50 hover:shadow-[0_0_15px_var(--glow-primary)] transition-all duration-300">
                    <CardHeader>
                      <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                        <IconComponent className="w-12 h-12 text-primary mb-4" />
                      </motion.div>
                      <CardTitle className="font-display">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
