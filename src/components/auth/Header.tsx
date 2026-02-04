import React from "react";
import { ThemeToggle } from "../ThemeToggle";
import Image from "next/image";

function Header() {
  return (
    <header className="w-full border-b">
      <nav className="container py-4 mx-auto flex justify-between items-center">
        <div>
          <Image
            src="/assets/images/Jain-logo.png"
            alt="Jain Logo"
            className="dark:hidden"
            height={100}
            width={"120"}
          />
          <Image
            src="/assets/images/Jain-logo-white.png"
            alt="Jain Logo"
            className="hidden dark:block"
            height={100}
            width={"120"}
          />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
