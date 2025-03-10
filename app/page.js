"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const Login = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
      }

      toast.success(responseData.message);

      router.push(responseData.roleIs);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[url('/bg.png')] bg-cover bg-center min-h-svh flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full bg-white/70 sm:max-w-sm border border-black rounded-md overflow-hidden">
        <div className="bg-black p-3 py-5 flex gap-2 text-white justify-between items-center">
          <div className="flex gap-2">
            <div>
              <Image
                className="h-[50px] w-auto"
                src="/logo.png"
                width={300}
                height={300}
                alt="Logo"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">ÉCOLE</span>
              <span className="font-bold">RONSARD</span>
            </div>
          </div>

          <h2 className="font-bold tracking-tight text-gray-100">Sign in</h2>
        </div>

        <form className="space-y-6 mt-6 p-4" onSubmit={Login}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 disabled:bg-indigo-300 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  Processing…
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 my-5 text-sm">
          <span className="text-indigo-600">Log in as:</span>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, role: e.target.value }))
            }
            className="border rounded-md p-2"
          >
            <option value={"admin"}>Admin</option>

            <option value={"teacher"}>Teacher</option>
          </select>
        </div>
      </div>
    </div>
  );
}
