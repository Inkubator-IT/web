import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="-mt-[120px] flex min-h-screen w-full flex-col items-center justify-center">
      <h1>404 | Page not-found</h1>
      <Link href="/" className="cursor-pointer text-blue-200 underline">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
