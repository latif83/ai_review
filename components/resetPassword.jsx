"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const ResetPassword = ({ setResetPassword, formData, setFormData }) => {

    const [form, setForm] = useState({
        email: formData.email,
        role: formData.role,
        defaultPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong.");
            } else {
                toast.success(data.message);
                setFormData((prevData) => ({ ...prevData, password: "" }))
                setResetPassword(false)
            }
        } catch (err) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">
            <div className="max-w-2xl transition duration-1000 bg-white mx-auto rounded-xl p-3">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">Reset Password</h1>
                    <button
                        type="button"
                        onClick={() => setResetPassword(false)}
                        className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mt-5">
                    <p className="text-sm">You are required to change your default password on first login.</p>

                    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm">Enter your default password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="defaultPassword"
                                placeholder="Default password"
                                className="p-2 border block w-full rounded mt-1 text-sm"
                                value={form.defaultPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm">Enter your new password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="New password"
                                className="p-2 border block w-full rounded mt-1 text-sm"
                                value={form.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm">Confirm your new password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                className="p-2 border block w-full rounded mt-1 text-sm"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPassword">Show password</label>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="p-2 bg-blue-600 text-white rounded-md text-sm flex items-center justify-center gap-2 hover:bg-blue-800 disabled:bg-blue-300"
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
                                    <span>Reset Password</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
