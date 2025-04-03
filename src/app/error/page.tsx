import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/app/sign-in');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>Error</h1>
      <p>Your session has expired. Redirecting to sign-in page...</p>
    </div>
  );
};

export default ErrorPage;