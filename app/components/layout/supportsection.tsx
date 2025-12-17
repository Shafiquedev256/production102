"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I start selling on NDI Bloker?",
    answer:
      "Simply create a seller account, complete your profile verification, and start listing your products. You can set your own commission rates to attract affiliates who will help promote your products.",
  },
  {
    question: "How do affiliate commissions work?",
    answer:
      "When an affiliate promotes your product and makes a sale through their unique link, they earn the commission you set. You only pay commissions on successful sales that you verify in your dashboard.",
  },
  {
    question: "When do I receive payments?",
    answer:
      "Sellers receive payments weekly via mobile money or bank transfer. Affiliates are paid automatically once their earnings reach the minimum payout threshold of $50.",
  },
  {
    question: "What countries can I sell to?",
    answer:
      "NDI Bloker operates across 7 African countries: Uganda, Kenya, Tanzania, Rwanda, Nigeria, Ghana, and South Africa. You can sell to customers in any of these countries.",
  },
  {
    question: "Are there any fees to join?",
    answer:
      "No! Joining NDI Bloker is completely free for both sellers and affiliates. We only take a small platform fee on successful transactions.",
  },
  {
    question: "How do I track my sales and commissions?",
    answer:
      "Both sellers and affiliates have access to comprehensive dashboards with real-time analytics, showing sales, clicks, conversions, and earnings.",
  },
];

export default function SupportSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <section
      id='support'
      className='py-24 bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden'
    >
      <div className='absolute inset-0 opacity-10'></div>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16'>
          {/* Left Side - Contact Options */}
          <div className='space-y-8'>
            <div>
              <h2 className='font-display text-5xl lg:text-6xl font-bold text-dark mb-4'>
                We're Here to Help
              </h2>
              <p className='text-xl text-gray'>
                Have questions? Our support team is available 24/7 to assist you
                with anything you need.
              </p>
            </div>

            <div className='space-y-4'>
              {/* Email Support */}
              <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary relative overflow-hidden cursor-pointer'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0'>
                    <i className='ri-mail-line text-2xl text-primary'></i>
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-xl font-bold text-dark mb-2'>
                      Email Support
                    </h4>
                    <a
                      href='mailto:support@ndibloker.com'
                      className='text-primary font-semibold hover:underline'
                    >
                      support@ndibloker.com
                    </a>
                    <p className='text-sm text-gray mt-1'>
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support */}
              <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-success relative overflow-hidden cursor-pointer'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 flex items-center justify-center bg-success/10 rounded-xl flex-shrink-0'>
                    <i className='ri-whatsapp-line text-2xl text-success'></i>
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-xl font-bold text-dark mb-2'>
                      WhatsApp Support
                    </h4>
                    <a
                      href='https://wa.me/256700000000'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-success font-semibold hover:underline'
                    >
                      +256 700 000 000
                    </a>
                    <p className='text-sm text-gray mt-1'>Instant support</p>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-secondary cursor-pointer'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 flex items-center justify-center bg-secondary/10 rounded-xl flex-shrink-0'>
                    <i className='ri-message-3-line text-2xl text-secondary'></i>
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-xl font-bold text-dark mb-2'>
                      Live Chat
                    </h4>
                    <button className='text-secondary font-semibold hover:underline whitespace-nowrap'>
                      Start a conversation
                    </button>
                    <p className='text-sm text-gray mt-1'>Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - FAQs */}
          <div>
            <h3 className='text-3xl font-bold text-dark mb-8'>
              Frequently Asked Questions
            </h3>
            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? "border-l-4 border-primary" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? -1 : index)
                    }
                    className='w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer'
                  >
                    <span className='font-bold text-dark text-lg pr-4'>
                      {faq.question}
                    </span>
                    <div className='w-8 h-8 flex items-center justify-center flex-shrink-0'>
                      <i
                        className={`text-2xl text-primary transition-transform ${
                          openFaqIndex === index
                            ? "ri-subtract-line"
                            : "ri-add-line"
                        }`}
                      ></i>
                    </div>
                  </button>
                  {openFaqIndex === index && (
                    <div className='px-6 pb-4 text-gray leading-relaxed animate-fadeIn'>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
