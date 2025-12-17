"use client";

import Image from "next/image";
import Link from "next/link";

export default function MarketplacePreview() {
  const products = [
    {
      id: 1,
      name: "Traditional African Basket Set",
      category: "Home & Decor",
      seller: "Kampala Crafts",
      price: 45,
      commission: 12,
      image: "/7658987cd25fc80f20cab32148a1a860.jpg",
      verified: true,
      country: "🇺🇬",
    },
    {
      id: 2,
      name: "Ankara Fashion Dress",
      category: "Fashion",
      seller: "Lagos Style",
      price: 85,
      commission: 25,
      image: "/7658987cd25fc80f20cab32148a1a860.jpg",
      verified: true,
      country: "🇳🇬",
    },
    {
      id: 3,
      name: "Wireless Bluetooth Speaker",
      category: "Electronics",
      seller: "Nairobi Tech",
      price: 120,
      commission: 35,
      image: "/7658987cd25fc80f20cab32148a1a860.jpg",
      verified: true,
      country: "🇰🇪",
    },
    {
      id: 4,
      name: "Organic Shea Butter Set",
      category: "Beauty",
      seller: "Accra Naturals",
      price: 35,
      commission: 10,
      image: "/7658987cd25fc80f20cab32148a1a860.jpg",
      verified: true,
      country: "🇬🇭",
    },
    {
      id: 5,
      name: "Coffee Table Book - African Art",
      category: "Books",
      seller: "Cape Town Reads",
      price: 55,
      commission: 15,
      image: "/7658987cd25fc80f20cab32148a1a860.jpg",
      verified: true,
      country: "🇿🇦",
    },
    {
      id: 6,
      name: "Smart Fitness Watch",
      category: "Electronics",
      seller: "Dar Tech Hub",
      price: 95,
      commission: 28,
      image: "/7658987cd25fc80f20cab32148a1a860.jpg",
      verified: true,
      country: "🇹🇿",
    },
  ];

  return (
    <section
      id='marketplace'
      className='py-24 bg-gradient-to-b from-white to-gray-50'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='font-display text-5xl lg:text-6xl font-bold text-dark mb-4'>
            Explore the Marketplace
          </h2>
          <p className='text-xl text-gray max-w-3xl mx-auto mb-8'>
            Discover thousands of products from verified sellers across Africa.
            Generate your affiliate link and start earning today.
          </p>
          <Link
            href='/marketplace'
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all whitespace-nowrap'
          >
            View All Products
            <i className='ri-arrow-right-line ml-2 text-xl'></i>
          </Link>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'
            >
              {/* Product Image */}
              <div className='relative h-80 w-full overflow-hidden'>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={500}
                  className='w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

                {/* Category Badge */}
                <div className='absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-dark'>
                  {product.category}
                </div>

                {/* Country Flag */}
                <div className='absolute top-4 right-4 text-3xl'>
                  {product.country}
                </div>

                {/* Product Title Overlay */}
                <div className='absolute bottom-0 left-0 right-0 p-4'>
                  <h3 className='text-white font-bold text-xl line-clamp-2'>
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Product Info */}
              <div className='p-6 space-y-4'>
                {/* Seller Info */}
                <div className='flex items-center space-x-2'>
                  <div className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'>
                    <i className='ri-store-2-line text-gray'></i>
                  </div>
                  <span className='text-sm text-gray'>{product.seller}</span>
                  {product.verified && (
                    <div className='w-4 h-4 flex items-center justify-center'>
                      <i className='ri-verified-badge-fill text-primary'></i>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className='flex items-baseline space-x-2'>
                  <span className='text-3xl font-bold text-dark'>
                    ${product.price}
                  </span>
                </div>

                {/* Commission Badge */}
                <div className='inline-flex items-center px-4 py-2 bg-success/10 rounded-full'>
                  <i className='ri-money-dollar-circle-line text-success mr-2'></i>
                  <span className='text-success font-semibold'>
                    Earn ${product.commission} per sale
                  </span>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 pt-2'>
                  <button className='flex-1 px-4 py-3 bg-gray-100 text-dark rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap'>
                    View Details
                  </button>
                  <button className='flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all whitespace-nowrap'>
                    Generate Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
