"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      const jsonData = await fetch(
        "https://ig-backend-jivr.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await jsonData.json();

      if (!jsonData.ok) {
        setError(data.message || "Something went wrong. Pls try again.");
        return;
      }

      const token = data.token;
      console.log(token);
      localStorage.setItem("accessToken", token);

      router.push("/post");
    } catch (err) {
      console.error("Error during signup:", err);
      setError(" error occurred while processing your request.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Instagram
        </h1>
        <h1 className="text-xs italic text-center text-gray-800 mb-6">
          Sign up to see photos and videos from your friends.
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <Input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <Input
              type="text"
              id="userName"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-500">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
