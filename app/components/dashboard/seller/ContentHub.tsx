import { useState } from "react";

interface Creative {
  id: number;
  type: "banner" | "video" | "copy";
  name: string;
  size: string;
  format: string;
  downloads: number;
  shares: number;
}

export default function ContentHub() {
  const [selectedType, setSelectedType] = useState<
    "all" | "banner" | "video" | "copy"
  >("all");

  const creatives: Creative[] = [
    {
      id: 1,
      type: "banner",
      name: "Premium Plan Banner 728x90",
      size: "728x90",
      format: "PNG",
      downloads: 234,
      shares: 89,
    },
    {
      id: 2,
      type: "banner",
      name: "Starter Pack Banner 300x250",
      size: "300x250",
      format: "PNG",
      downloads: 189,
      shares: 67,
    },
    {
      id: 3,
      type: "video",
      name: "Product Demo Video",
      size: "1920x1080",
      format: "MP4",
      downloads: 156,
      shares: 54,
    },
    {
      id: 4,
      type: "copy",
      name: "Email Template - Welcome",
      size: "N/A",
      format: "HTML",
      downloads: 298,
      shares: 112,
    },
    {
      id: 5,
      type: "copy",
      name: "Social Media Copy Pack",
      size: "N/A",
      format: "TXT",
      downloads: 267,
      shares: 98,
    },
    {
      id: 6,
      type: "banner",
      name: "Enterprise Plan Banner 160x600",
      size: "160x600",
      format: "PNG",
      downloads: 145,
      shares: 43,
    },
  ];

  const filteredCreatives =
    selectedType === "all"
      ? creatives
      : creatives.filter((c) => c.type === selectedType);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Content Hub</h2>
          <p className='text-sm text-gray-600 mt-1'>
            Marketing materials and creative assets
          </p>
        </div>
        <button className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap'>
          <i className='ri-upload-2-line text-lg w-5 h-5 flex items-center justify-center'></i>
          <span className='font-medium'>Upload Asset</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className='bg-white rounded-xl border border-gray-200 p-2 inline-flex gap-1'>
        {[
          { id: "all", label: "All Assets", icon: "ri-grid-line" },
          { id: "banner", label: "Banners", icon: "ri-image-line" },
          { id: "video", label: "Videos", icon: "ri-video-line" },
          { id: "copy", label: "Copy", icon: "ri-file-text-line" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setSelectedType(tab.id as "all" | "banner" | "video" | "copy")
            }
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedType === tab.id
                ? "bg-teal-50 text-teal-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <i
              className={`${tab.icon} text-lg w-5 h-5 flex items-center justify-center`}
            ></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredCreatives.map((creative) => (
          <div
            key={creative.id}
            className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow'
          >
            {/* Preview */}
            <div className='mb-4 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
              <i
                className={`${
                  creative.type === "banner"
                    ? "ri-image-line"
                    : creative.type === "video"
                      ? "ri-video-line"
                      : "ri-file-text-line"
                } text-5xl w-12 h-12 flex items-center justify-center text-gray-400`}
              ></i>
            </div>
            {/* Info */}
            <div className='mb-4'>
              <h3 className='text-sm font-bold text-gray-900 mb-2 line-clamp-2'>
                {creative.name}
              </h3>
              <div className='flex items-center gap-3 text-xs text-gray-600'>
                <span>{creative.size}</span>
                <span>•</span>
                <span>{creative.format}</span>
              </div>
            </div>
            {/* Stats */}
            <div className='flex items-center gap-4 mb-4 pb-4 border-b border-gray-200'>
              <div className='flex items-center gap-1'>
                <i className='ri-download-line text-sm w-4 h-4 flex items-center justify-center text-gray-600'></i>
                <span className='text-xs text-gray-600'>
                  {creative.downloads}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <i className='ri-share-line text-sm w-4 h-4 flex items-center justify-center text-gray-600'></i>
                <span className='text-xs text-gray-600'>{creative.shares}</span>
              </div>
            </div>
            {/* Actions */}
            <div className='flex gap-2'>
              <button className='flex-1 px-3 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium whitespace-nowrap'>
                Share
              </button>
              <button className='flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap'>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Share Section */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>
          Quick Share to Affiliates
        </h3>
        <div className='flex flex-col sm:flex-row gap-3'>
          <input
            type='text'
            placeholder='Enter affiliate email addresses (comma separated)'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
          />
          <button className='px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap'>
            Send Assets
          </button>
        </div>
      </div>
    </div>
  );
}
