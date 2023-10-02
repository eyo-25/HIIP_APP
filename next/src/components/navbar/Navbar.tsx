"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "./Navbar.data";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="border-t border-gray-750 absolute bottom-0pxr left-0pxr z-10 w-full h-[10%] bg-white">
      <ul className="grid grid-cols-4 items-center h-full">
        {LINKS.map(({ icon, href, title, selectIcon }, idx) => (
          <li key={idx}>
            <Link href={href} className="flex-col-center">
              {path === `${href}` ? selectIcon : icon}
              <h2
                className={`text-xs ${
                  path === href ? "text-black" : "text-gray-600"
                }`}
              >
                {title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
