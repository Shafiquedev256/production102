"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    tag: "Easy Setup",
    title: "List Products in Minutes",
    description:
      "Our intuitive dashboard makes it easy to add products, manage inventory, and track sales all in one place.",
    image: "/sellwithus.jpg",
    benefits: [
      "Simple product upload process",
      "Bulk import from spreadsheets",
      "Automatic image optimization",
      "Real-time inventory tracking",
    ],
  },
  {
    tag: "Flexible Commissions",
    title: "Set Your Own Rates",
    description:
      "Control how much you pay affiliates per sale. Higher commissions attract more promoters and drive more sales.",
    image: "/sellwithus4.jpg",
    benefits: [
      "Choose commission percentages",
      "Attract more affiliates with competitive rates",
      "Adjust rates anytime",
      "Performance-based bonuses",
    ],
  },
  {
    tag: "Order Management",
    title: "Streamlined Fulfillment",
    description:
      "Manage all your orders from one dashboard. Verify fulfilled orders and release affiliate commissions with a single click.",
    image: "/sellwithus2.jpg",
    benefits: [
      "Centralized order dashboard",
      "Automated notifications",
      "Easy order verification",
      "Integrated shipping labels",
    ],
  },
  {
    tag: "Analytics",
    title: "Track Your Performance",
    description:
      "Get insights into your sales, top-performing products, and affiliate contributions with comprehensive analytics.",
    image: "/sellwithus3.jpg",
    benefits: [
      "Real-time sales tracking",
      "Affiliate performance metrics",
      "Revenue forecasting",
      "Export detailed reports",
    ],
  },
  {
    tag: "Support",
    title: "24/7 Seller Support",
    description:
      "Our support team is always ready to help you succeed. Get answers quickly and grow your business with confidence.",
    image: "/sellwithus4.jpg",
    benefits: [
      "Dedicated account managers",
      "Live chat support",
      "Comprehensive knowledge base",
      "Seller community forum",
    ],
  },
];

export default function SellWithUsSection() {
  return (
    <section id='sell-with-us' className='py-24'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-20'>
          <h2 className='font-display text-5xl lg:text-6xl font-bold text-dark mb-4'>
            Why Sell with Us?
          </h2>
          <p className='text-xl text-gray max-w-3xl mx-auto'>
            Join thousands of successful sellers who are growing their
            businesses with our powerful marketplace platform
          </p>
        </div>

        {/* Feature Blocks */}
        <div className='space-y-24'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 items-center rounded-3xl p-8 lg:p-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              } ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {/* Feature Image */}
              <div className='lg:w-1/2'>
                <div className='relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl'>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className='object-cover object-top'
                  />
                </div>
              </div>

              {/* Feature Content */}
              <div className='lg:w-1/2 space-y-6'>
                <div className='inline-block px-4 py-2 bg-primary/10 rounded-full'>
                  <span className='text-primary font-semibold text-sm uppercase tracking-wide'>
                    {feature.tag}
                  </span>
                </div>
                <h3 className='font-display text-4xl lg:text-5xl font-bold text-dark'>
                  {feature.title}
                </h3>
                <p className='text-lg text-gray leading-relaxed'>
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className='space-y-4'>
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className='flex items-start space-x-3'>
                      <div className='flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary rounded-full mt-1'>
                        <i className='ri-check-line text-white text-sm'></i>
                      </div>
                      <span className='text-dark font-medium'>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href='/seller-dashboard'
                  className='inline-flex items-center text-primary font-semibold text-lg hover:text-primary-dark transition-colors whitespace-nowrap'
                >
                  Learn More
                  <i className='ri-arrow-right-line ml-2'></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className='mt-20 text-center'>
          <Link
            href='/seller-dashboard'
            className='inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap'
          >
            Start Selling Today
            <i className='ri-arrow-right-line ml-3 text-2xl'></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
