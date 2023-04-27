import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="container mx-auto p-4 bg-neutral-900 sm:px-8 text-white">
        <Link href="/">
          <h1 className="text-2xl font-bold w-fit hover:text-gray-400">
            TokyoDev
          </h1>
        </Link>
      </div>
    </nav>
  );
}
