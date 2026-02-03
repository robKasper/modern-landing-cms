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

export function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    const fetchFAQs = async () => {
      const data = await client.fetch(`
        *[_type == "faq"] | order(order asc) {
          _id,
          question,
          answer,
          order
        }
      `)
      setFaqs(data)
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  )
}