export default function VerifySuccessPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='p-8 bg-white shadow-lg rounded-xl max-w-md text-center'>
        <h1 className='text-3xl font-semibold text-green-600 mb-4'>
          Email Verified 🎉
        </h1>
        <p className='text-gray-700 mb-6'>
          Your email has been successfully verified! You can now log in to your
          account.
        </p>

        <a
          href='/auth/seller/login'
          className='bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition'
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
