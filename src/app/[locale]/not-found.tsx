import Link from 'next/link';
import { getMessages, type Locale } from "@/lib/i18n";

interface NotFoundProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function NotFound({ params }: NotFoundProps) {
  const { locale } = await params;
  const messages = getMessages(locale);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">{messages.navigation.notFound}</h2>
        <p className="text-gray-600 mb-6">
          {messages.navigation.notFoundMessage}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {messages.navigation.home}
        </Link>
      </div>
    </div>
  );
}
