"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Bu yerda login logikasi bo‘ladi (keyin backend bilan bog‘lanadi)
    console.log("Username:", username, "Password:", password);
    // Misol uchun, foydalanuvchi ma'lumotlari tekshiriladi va redirect qilinadi
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Login to NextLearn
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your credentials to access the admin panel
          </p>

          {/* Forma */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            {/* Login tugmasi */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>

          {/* Qo‘shimcha eslatma */}
          <p className="text-gray-600 text-sm text-center mt-4">
            Use the credentials provided by your admin. You can update them
            after logging in.
          </p>
        </div>
      </main>
    </div>
  );
}
