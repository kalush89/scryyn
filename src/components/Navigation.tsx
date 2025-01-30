"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Navigation() {

    const router = useRouter();

    const handleLogout = async () => {
        signOut({ redirect: false }).then(() => {
          router.push("/");
        });
      };
    
    const {data} = useSession();
    console.log(data)
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="text-xl font-semibold">My App</div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Welcome, {data?.user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
