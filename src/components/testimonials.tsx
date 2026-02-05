"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  order: number;
}

function TestimonialSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
          <div className="h-4 bg-gray-200 rounded mb-2 w-5/6" />
          <div className="h-4 bg-gray-200 rounded mb-6 w-4/6" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AvatarFallback({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
      {name.charAt(0)}
    </div>
  );
}

function TestimonialAvatar({ testimonial }: { testimonial: Testimonial }) {
  const [imageError, setImageError] = useState(false);

  if (!testimonial.avatar || imageError) {
    return <AvatarFallback name={testimonial.author} />;
  }

  return (
    <Image
      src={urlFor(testimonial.avatar).width(48).height(48).url()}
      alt={`${testimonial.author}, ${testimonial.role} at ${testimonial.company}`}
      width={48}
      height={48}
      className="rounded-full"
      onError={() => setImageError(true)}
    />
  );
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "testimonial"] | order(order asc) {
            _id,
            quote,
            author,
            role,
            company,
            avatar,
            order
          }
        `);
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Loved by teams around the world
          </h2>
        </div>

        {error && (
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          ) : (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-6 italic">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                      <TestimonialAvatar testimonial={testimonial} />
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
