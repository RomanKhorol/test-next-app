import { Suspense } from "react";

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-50  flex flex-col min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        It is result
      </h2>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
