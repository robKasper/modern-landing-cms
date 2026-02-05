'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'

interface FAQ {
  _id: string
  question: string
  answer: string
  order: number
}

function FAQSkeleton() {
  return (
    <div className="border-b py-4">
      <div className="animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      </div>
    </div>
  )
}

export function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "faq"] | order(order asc) {
            _id,
            question,
            answer,
            order
          }
        `)
        setFaqs(data)
      } catch (err) {
        console.error('Failed to fetch FAQs:', err)
        setError('Failed to load FAQs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about TaskFlow
          </p>
        </div>

        {error && (
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {isLoading ? (
            <div className="space-y-2">
              <FAQSkeleton />
              <FAQSkeleton />
              <FAQSkeleton />
              <FAQSkeleton />
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq._id} value={faq._id}>
                  <AccordionTrigger className="text-left text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </section>
  )
}
