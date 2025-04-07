import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error'); // Get the error query parameter

  useEffect(() => {
    // Redirect to sign-in page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/app/sign-in');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  // Determine the error message based on the error query parameter
  const errorMessage = (() => {
    switch (error) {
      case 'SessionExpired':
        return 'Your session has expired. Redirecting to sign-in page...';
      case 'undefined': // Handle undefined errors (e.g., 404)
        return 'The page you are looking for does not exist.';
      default:
        return 'An unexpected error occurred. Redirecting to sign-in page...';
    }
  })();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">Error</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">{errorMessage}</p>
      <p className="mt-6 text-sm text-gray-500">
        You will be redirected to the sign-in page shortly.
      </p>
    </div>
  );
};

export default ErrorPage;