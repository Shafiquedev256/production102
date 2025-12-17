import { useState } from "react";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<
    "branding" | "domain" | "tracking" | "api" | "notifications"
  >("branding");

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>System Settings</h2>
        <p className='text-sm text-gray-600 mt-1'>
          Configure your platform settings
        </p>
      </div>

      {/* Settings Navigation */}
      <div className='bg-white rounded-xl border border-gray-200'>
        <div className='border-b border-gray-200 px-6'>
          <div className='flex gap-6 overflow-x-auto'>
            {[
              { id: "branding", label: "Branding", icon: "ri-palette-line" },
              { id: "domain", label: "Domain", icon: "ri-global-line" },
              { id: "tracking", label: "Tracking", icon: "ri-radar-line" },
              { id: "api", label: "API Keys", icon: "ri-key-line" },
              {
                id: "notifications",
                label: "Notifications",
                icon: "ri-notification-3-line",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <i
                  className={`${tab.icon} text-lg w-5 h-5 flex items-center justify-center`}
                ></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className='p-6'>
          {/* Branding Tab */}
          {activeTab === "branding" && (
            <div className='space-y-6'>
              {/* Platform Name */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Platform Name
                </label>
                <input
                  type='text'
                  defaultValue='My Affiliate Platform'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                />
              </div>
              {/* Logo */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Logo
                </label>
                <div className='flex items-center gap-4'>
                  <img
                    src='https://public.readdy.ai/ai/img_res/808ffc23-c929-4a09-8ce0-63f07540a43c.png'
                    alt='Logo'
                    className='h-16 w-auto object-contain border border-gray-200 rounded-lg p-2'
                  />
                  <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap'>
                    Change Logo
                  </button>
                </div>
              </div>
              {/* Brand Color */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Brand Color
                </label>
                <div className='flex items-center gap-3'>
                  <input
                    type='color'
                    defaultValue='#14B8A6'
                    className='w-12 h-12 rounded-lg border border-gray-300 cursor-pointer'
                  />
                  <input
                    type='text'
                    defaultValue='#14B8A6'
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                  />
                </div>
              </div>
              <button className='px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap'>
                Save Changes
              </button>
            </div>
          )}

          {/* Domain Tab */}
          {activeTab === "domain" && (
            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Custom Domain
                </label>
                <input
                  type='text'
                  placeholder='affiliates.yourdomain.com'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                />
                <p className='text-xs text-gray-600 mt-2'>
                  Point your domain to: 123.456.789.0
                </p>
              </div>
              <div className='p-4 bg-blue-50 rounded-lg'>
                <div className='flex gap-3'>
                  <i className='ri-information-line text-lg w-5 h-5 flex items-center justify-center text-blue-600 flex-shrink-0'></i>
                  <div>
                    <p className='text-sm font-semibold text-blue-900 mb-1'>
                      Domain Setup Instructions
                    </p>
                    <p className='text-xs text-blue-700'>
                      Add a CNAME record pointing to our servers. SSL
                      certificate will be automatically provisioned.
                    </p>
                  </div>
                </div>
              </div>
              <button className='px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap'>
                Verify Domain
              </button>
            </div>
          )}

          {/* Tracking Tab */}
          {activeTab === "tracking" && (
            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Tracking Domain
                </label>
                <input
                  type='text'
                  defaultValue='track.yourdomain.com'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Cookie Duration (days)
                </label>
                <input
                  type='number'
                  defaultValue={30}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                />
              </div>
              <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                <div>
                  <p className='text-sm font-semibold text-gray-900'>
                    Enable Cross-Domain Tracking
                  </p>
                  <p className='text-xs text-gray-600 mt-1'>
                    Track users across multiple domains
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
              <button className='px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap'>
                Save Settings
              </button>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === "api" && (
            <div className='space-y-6'>
              <div className='p-4 bg-yellow-50 rounded-lg'>
                <div className='flex gap-3'>
                  <i className='ri-alert-line text-lg w-5 h-5 flex items-center justify-center text-yellow-600 flex-shrink-0'></i>
                  <div>
                    <p className='text-sm font-semibold text-yellow-900 mb-1'>
                      Keep Your Keys Secure
                    </p>
                    <p className='text-xs text-yellow-700'>
                      Never share your API keys publicly or commit them to
                      version control.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Public API Key
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value='pk_live_51234567890abcdef'
                    readOnly
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm'
                  />
                  <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap'>
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Secret API Key
                </label>
                <div className='flex gap-2'>
                  <input
                    type='password'
                    value='sk_live_51234567890abcdef'
                    readOnly
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm'
                  />
                  <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap'>
                    Show
                  </button>
                </div>
              </div>
              <button className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm whitespace-nowrap'>
                Regenerate Keys
              </button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className='space-y-6'>
              <p className='text-sm text-gray-600'>
                Manage system notifications and alerts.
              </p>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                  <div>
                    <p className='text-sm font-semibold text-gray-900'>
                      Email Notifications
                    </p>
                    <p className='text-xs text-gray-600 mt-1'>
                      Send notifications to affiliates via email
                    </p>
                  </div>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked
                  />
                </div>
                <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                  <div>
                    <p className='text-sm font-semibold text-gray-900'>
                      SMS Notifications
                    </p>
                    <p className='text-xs text-gray-600 mt-1'>
                      Send notifications via SMS
                    </p>
                  </div>
                  <input type='checkbox' className='sr-only peer' />
                </div>
              </div>
              <button className='px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap'>
                Save Notification Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
