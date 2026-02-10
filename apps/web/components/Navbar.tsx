import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./Searchbar";
import { IconDashboardFilled } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <nav className="w-full flex-center justify-between pb-3">
      <Link href="/" className="flex items-center">
        <IconDashboardFilled className="text-amber-50" size={32} />
        <p className="hidden md:block text-md font-medium tracking-wider text-white">
          {"Microverse ."}
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
