"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface PricingPlan {
  _id: string;
  name: string;
  description: string;
  price: number | null;
  features: string[];
  ctaText: string;
  popular: boolean;
  order: number;
}

// Fallback data for when CMS is empty
const fallbackPlans: PricingPlan[] = [
  {
    _id: "1",
    name: "Starter",
    price: 29,
    description: "Perfect for small teams getting started",
    features: [
      "Up to 10 users",
      "3 active projects",
      "Basic integrations",
      "Community support",
      "5GB storage",
    ],
    ctaText: "Start Free Trial",
    popular: false,
    order: 0,
  },
  {
    _id: "2",
    name: "Professional",
    price: 79,
    description: "For growing teams that need more power",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "All integrations",
      "Advanced reporting",
      "Priority support",
      "50GB storage",
      "Custom workflows",
    ],
    ctaText: "Start Free Trial",
    popular: true,
    order: 1,
  },
  {
    _id: "3",
    name: "Enterprise",
    price: null,
    description: "For large organizations with custom needs",
    features: [
      "Everything in Professional",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Unlimited storage",
      "On-premise option",
    ],
    ctaText: "Contact Sales",
    popular: false,
    order: 2,
  },
];

function PricingSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="animate-pulse">
          <div className="h-7 bg-muted rounded w-1/2 mb-2" />
          <div className="h-4 bg-muted rounded w-3/4 mb-4" />
          <div className="h-10 bg-muted rounded w-1/3" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/6" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="animate-pulse w-full">
          <div className="h-11 bg-muted rounded w-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "pricingPlan"] | order(order asc) {
            _id,
            name,
            description,
            price,
            features,
            ctaText,
            popular,
            order
          }
        `);
        setPlans(data.length > 0 ? data : fallbackPlans);
      } catch (err) {
        console.error("Failed to fetch pricing plans:", err);
        setPlans(fallbackPlans);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-display">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            <>
              <PricingSkeleton />
              <PricingSkeleton />
              <PricingSkeleton />
            </>
          ) : (
            plans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    POPULAR
                  </div>
                )}

                <Card
                  className={`h-full ${plan.popular ? "border-primary border-2 glow-primary-sm" : ""}`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      {plan.price !== null ? (
                        <div>
                          <span className="text-4xl font-bold">
                            ${plan.price}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold">Custom</div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <FiCheck className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.ctaText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
