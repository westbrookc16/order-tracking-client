"use client";
import { useAuth } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
export default function Navbar() {
  const { signOut } = useClerk();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { userId } = useAuth();
  const toggleNav: any = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav
      className={`bg-slate-800 transition-all duration-300 h-14 top-0 sticky flex items-center justify-between ${
        isNavOpen ? "h-40 md:h-14" : "h-14"
      }`}
    >
      <div
        className={`container mx-auto flex justify-between ${
          isNavOpen ? "items-start" : "items-center"
        }`}
      >
        <ul>
          <li className="text-slate-200 text-sm font-light uppercase transition duration-300 cursor-pointer hover:text-slate-400">
            <Link href="/">LOGO</Link>
          </li>
        </ul>
        <ul className="hidden md:flex justify-center text-sm items-center gap-2 uppercase font-light">
          <li className="text-slate-200 text-sm font-light uppercase transition duration-300 cursor-pointer hover:text-slate-400">
            <Link href="/">Home</Link>
          </li>
          <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
            <Link href="/clients">Clients</Link>
          </li>
          <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
            <Link href="/clients/new">New Client</Link>
          </li>
          <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
            <Link href="/order/new">New Order</Link>
          </li>
          <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
            {userId ? (
              <button
                onClick={(e) => {
                  signOut();
                  router.push("/");
                }}
              >
                Sign Out
              </button>
            ) : (
              <SignInButton />
            )}
          </li>
        </ul>
        {/* Mobile nav */}
        {isNavOpen && (
          <ul className="flex flex-col justify-center text-xs items-center gap-2 uppercase font-light md:hidden">
            <li className="text-slate-200 font-light uppercase transition duration-300 cursor-pointer hover:text-slate-400">
              <Link href="/">Home</Link>
            </li>
            <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
              <Link href="/clients">Clients</Link>
            </li>
            <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
              <Link href="/clients/new">New Client</Link>
            </li>
            <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
              <Link href="/order/new">New Order</Link>
            </li>
            <li className="text-slate-200 transition duration-300 cursor-pointer hover:text-slate-400">
              {userId ? (
                <button
                  onClick={(e) => {
                    signOut();
                    router.push("/");
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <SignInButton />
              )}
            </li>
          </ul>
        )}
        <button
          className={`visible flex ${
            isNavOpen ? "items-start" : "items-center"
          } md:hidden`}
        >
          <Hamburger
            onToggle={toggleNav}
            toggled={isNavOpen}
            color="#f8fafc"
            size={20}
          />
        </button>
      </div>
    </nav>
  );
}
