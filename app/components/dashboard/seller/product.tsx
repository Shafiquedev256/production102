"use client";

import { useState } from "react";
import Image from "next/image";
import { ISeller } from "@/app/hooks/useSeller";

interface ProductsProps {
  seller: ISeller;
}

export default function Products({ seller }: ProductsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: "$299",
      stock: 45,
      status: "Active",
      sales: 342,
      image:
        "https://readdy.ai/api/search-image?query=premium wireless headphones with modern black design on clean white background professional product photography high quality studio lighting&width=100&height=100&seq=p1&orientation=squarish",
    },
    {
      id: 2,
      name: "Ergonomic Wireless Mouse",
      category: "Electronics",
      price: "$49",
      stock: 128,
      status: "Active",
      sales: 289,
      image:
        "https://readdy.ai/api/search-image?query=ergonomic wireless mouse in white color on minimal background professional product shot clean studio lighting high quality&width=100&height=100&seq=p2&orientation=squarish",
    },
    {
      id: 3,
      name: "Aluminum Laptop Stand",
      category: "Accessories",
      price: "$79",
      stock: 67,
      status: "Active",
      sales: 234,
      image:
        "https://readdy.ai/api/search-image?query=aluminum laptop stand with sleek modern design on white background professional product photography minimalist style high quality&width=100&height=100&seq=p3&orientation=squarish",
    },
    {
      id: 4,
      name: "USB-C Hub Adapter",
      category: "Accessories",
      price: "$89",
      stock: 0,
      status: "Out of Stock",
      sales: 198,
      image:
        "https://readdy.ai/api/search-image?query=compact usb-c hub adapter with multiple ports on clean white background professional product photography studio lighting high quality&width=100&height=100&seq=p4&orientation=squarish",
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: "$159",
      stock: 34,
      status: "Active",
      sales: 176,
      image:
        "https://readdy.ai/api/search-image?query=mechanical keyboard with rgb lighting on white background professional product photography modern design high quality studio shot&width=100&height=100&seq=p5&orientation=squarish",
    },
    {
      id: 6,
      name: "Webcam HD 1080p",
      category: "Electronics",
      price: "$129",
      stock: 12,
      status: "Low Stock",
      sales: 145,
      image:
        "https://readdy.ai/api/search-image?query=modern hd webcam with sleek black design on white background professional product photography studio lighting high quality&width=100&height=100&seq=p6&orientation=squarish",
    },
    {
      id: 7,
      name: "Phone Stand Holder",
      category: "Accessories",
      price: "$29",
      stock: 89,
      status: "Active",
      sales: 267,
      image:
        "https://readdy.ai/api/search-image?query=adjustable phone stand holder in silver color on white background professional product photography minimalist style high quality&width=100&height=100&seq=p7&orientation=squarish",
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "$79",
      stock: 56,
      status: "Active",
      sales: 198,
      image:
        "https://readdy.ai/api/search-image?query=portable bluetooth speaker with modern design on white background professional product photography studio lighting high quality&width=100&height=100&seq=p8&orientation=squarish",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && product.status === "Active") ||
      (filterStatus === "low" && product.status === "Low Stock") ||
      (filterStatus === "out" && product.status === "Out of Stock");
    return matchesQuery && matchesStatus;
  });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Products</h2>
          <p className='text-sm text-gray-600 mt-1'>
            {seller.totalProducts} of {seller.uploadLimits.maxProducts} products
            used
          </p>
        </div>
        <button className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer'>
          <i className='ri-add-line text-lg'></i>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Storage Info */}
      <div className='bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-medium text-gray-800'>
            Storage Used
          </span>
          <span className='text-sm font-semibold text-gray-800'>
            {seller.storageUsedMB.toFixed(0)} MB / {seller.storageLimitMB} MB
          </span>
        </div>
        <div className='relative h-2 bg-white rounded-full overflow-hidden'>
          <div
            className='absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all'
            style={{
              width: `${(seller.storageUsedMB / seller.storageLimitMB) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-100'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1 relative'>
            <i className='ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg'></i>
            <input
              type='text'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500'
          >
            <option value='all'>All Status</option>
            <option value='active'>Active</option>
            <option value='low'>Low Stock</option>
            <option value='out'>Out of Stock</option>
          </select>
          <select className='px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500'>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
          </select>
        </div>
      </div>

      {/* Products Grid - Mobile */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4'>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'
          >
            <div className='p-4'>
              <div className='flex gap-4'>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className='rounded-lg object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <h3 className='font-semibold text-gray-800 text-sm mb-1 truncate'>
                    {product.name}
                  </h3>
                  <p className='text-xs text-gray-600 mb-2'>
                    {product.category}
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold text-gray-800'>
                      {product.price}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-4 pt-4 border-t border-gray-100 flex items-center justify-between'>
                <div className='text-xs text-gray-600'>
                  <span className='font-medium'>Stock:</span> {product.stock}{" "}
                  units
                </div>
                <div className='text-xs text-gray-600'>
                  <span className='font-medium'>Sales:</span> {product.sales}
                </div>
              </div>
              <div className='mt-3 flex gap-2'>
                <button className='flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer'>
                  Edit
                </button>
                <button className='flex-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all whitespace-nowrap cursor-pointer'>
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Table - Desktop */}
      <div className='hidden lg:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Product
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Category
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Stock
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Sales
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 flex items-center gap-3'>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className='rounded-lg object-cover'
                    />
                    <span className='text-sm text-gray-800 truncate'>
                      {product.name}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.category}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {product.price}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.stock}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {product.sales}
                  </td>
                  <td className='px-6 py-4 flex gap-2'>
                    <button className='px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'>
                      Edit
                    </button>
                    <button className='px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all'>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
