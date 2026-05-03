"use client";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-semibold">
            AI<span className="text-purple-600">Hub</span>
          </span>
          <div className="hidden md:flex gap-6 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-900">Discover</a>
            <a href="/dashboard" className="hover:text-gray-900">Dashboard</a>
          </div>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <img src={user.photoURL!} className="w-8 h-8 rounded-full" />
            <span className="text-sm text-gray-600 hidden md:block">{user.displayName}</span>
            <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-700">Sign out</button>
          </div>
        ) : (
          <button onClick={login} className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}