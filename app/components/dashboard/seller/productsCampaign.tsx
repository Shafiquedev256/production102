import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  commission: number;
  status: "active" | "paused";
  clicks: number;
  conversions: number;
  revenue: number;
  topAffiliate: string;
}

export default function ProductsCampaigns() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Plan",
      price: 299.99,
      commission: 20,
      status: "active",
      clicks: 1234,
      conversions: 89,
      revenue: 26699.11,
      topAffiliate: "Sarah Johnson",
    },
    {
      id: 2,
      name: "Starter Pack",
      price: 149.99,
      commission: 15,
      status: "active",
      clicks: 2345,
      conversions: 156,
      revenue: 23398.44,
      topAffiliate: "Mike Chen",
    },
    {
      id: 3,
      name: "Enterprise Plan",
      price: 999.99,
      commission: 25,
      status: "active",
      clicks: 567,
      conversions: 34,
      revenue: 33999.66,
      topAffiliate: "Emma Wilson",
    },
    {
      id: 4,
      name: "Basic Plan",
      price: 79.99,
      commission: 10,
      status: "paused",
      clicks: 890,
      conversions: 45,
      revenue: 3599.55,
      topAffiliate: "David Brown",
    },
  ]);

  const handleToggleStatus = (id: number) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "paused" : "active" }
          : p
      )
    );
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Products & Campaigns
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Manage your products and track performance
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap'
        >
          <i className='ri-add-line text-lg w-5 h-5 flex items-center justify-center'></i>
          <span className='font-medium'>Add Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 gap-4'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow'
          >
            <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
              {/* Product Info */}
              <div className='flex-1'>
                <div className='flex items-start justify-between mb-3'>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900'>
                      {product.name}
                    </h3>
                    <div className='flex items-center gap-3 mt-1'>
                      <span className='text-sm text-gray-600'>
                        Price:{" "}
                        <span className='font-semibold text-gray-900'>
                          ${product.price}
                        </span>
                      </span>
                      <span className='text-sm text-gray-600'>
                        Commission:{" "}
                        <span className='font-semibold text-teal-600'>
                          {product.commission}%
                        </span>
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      product.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.status === "active" ? "Active" : "Paused"}
                  </span>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Clicks</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {product.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Conversions</p>
                    <p className='text-lg font-bold text-gray-900'>
                      {product.conversions}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Revenue</p>
                    <p className='text-lg font-bold text-gray-900'>
                      ${product.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Top Affiliate</p>
                    <p className='text-sm font-semibold text-gray-900 truncate'>
                      {product.topAffiliate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className='flex lg:flex-col gap-2'>
                <button
                  onClick={() => handleToggleStatus(product.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                    product.status === "active"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                  }`}
                >
                  {product.status === "active" ? "Pause" : "Activate"}
                </button>
                <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap'>
                  Edit
                </button>
                <button className='px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm whitespace-nowrap'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold text-gray-900'>
                Add New Product
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors'
              >
                <i className='ri-close-line text-xl w-5 h-5 flex items-center justify-center'></i>
              </button>
            </div>

            <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                  placeholder='Enter product name'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Price ($)
                </label>
                <input
                  type='number'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                  placeholder='0.00'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Commission Rate (%)
                </label>
                <input
                  type='number'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                  placeholder='0'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                  rows={3}
                  placeholder='Enter product description'
                ></textarea>
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => setShowAddModal(false)}
                  className='flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap'
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
