import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./Searchbar";

const Navbar = () => {
  return (
    <nav className="w-full flex-center justify-between pb-3">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="inline-block ml-2"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          {"Microverse"}
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
