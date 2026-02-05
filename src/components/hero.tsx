"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

interface CompanyLogo {
  name: string;
  logo?: string;
}

interface HeroContent {
  _id: string;
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  disclaimer?: string;
  heroImage?: string;
  socialProofText?: string;
  companyLogos?: CompanyLogo[];
}

// Fallback data for when CMS is empty
const fallbackContent: HeroContent = {
  _id: "fallback",
  headline: "Project Management That Actually Works",
  subheadline:
    "Stop juggling tools. TaskFlow brings tasks, time tracking, and team collaboration into one beautiful workspace.",
  primaryButtonText: "Start Free Trial",
  secondaryButtonText: "Watch Demo",
  disclaimer: "No credit card required • 14-day free trial",
  socialProofText: "Trusted by 10,000+ remote teams worldwide",
  companyLogos: [
    { name: "COMPANY" },
    { name: "BRAND" },
    { name: "STARTUP" },
    { name: "TECH" },
    { name: "AGENCY" },
  ],
};

function HeroSkeleton() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-full mb-4" />
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="h-6 bg-gray-200 rounded w-full mb-2" />
          <div className="h-6 bg-gray-200 rounded w-5/6 mb-8" />
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded w-36" />
            <div className="h-12 bg-gray-200 rounded w-36" />
          </div>
        </div>
        <div className="bg-gray-200 rounded-2xl aspect-video animate-pulse" />
      </div>
    </section>
  );
}

export function Hero() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "heroContent"][0] {
            _id,
            headline,
            subheadline,
            primaryButtonText,
            secondaryButtonText,
            disclaimer,
            heroImage,
            socialProofText,
            companyLogos[] {
              name,
              logo
            }
          }
        `);
        setContent(data || fallbackContent);
      } catch (err) {
        console.error("Failed to fetch hero content:", err);
        setContent(fallbackContent);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  const hero = content || fallbackContent;

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {hero.headline}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            {hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8">
              {hero.primaryButtonText}
            </Button>
            {hero.secondaryButtonText && (
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8"
              >
                {hero.secondaryButtonText}
              </Button>
            )}
          </div>
          {hero.disclaimer && (
            <p className="text-sm text-gray-500 mt-4">{hero.disclaimer}</p>
          )}
        </motion.div>

        {/* Right Column - Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center overflow-hidden"
        >
          {hero.heroImage ? (
            <Image
              src={urlFor(hero.heroImage).width(800).height(450).url()}
              alt={hero.headline}
              width={800}
              height={450}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="text-center text-gray-400 text-sm sm:text-base">
              [Dashboard Screenshot Placeholder]
              <p className="text-xs sm:text-sm mt-2">
                Add screenshot or mockup here
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Social Proof Bar */}
      {(hero.socialProofText || hero.companyLogos?.length) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          {hero.socialProofText && (
            <p className="text-sm text-gray-500 mb-8">{hero.socialProofText}</p>
          )}
          {hero.companyLogos && hero.companyLogos.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
              {hero.companyLogos.map((company, index) =>
                company.logo ? (
                  <Image
                    key={index}
                    src={urlFor(company.logo).width(120).height(40).url()}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <div
                    key={index}
                    className="text-xl md:text-2xl font-bold"
                  >
                    {company.name}
                  </div>
                )
              )}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
