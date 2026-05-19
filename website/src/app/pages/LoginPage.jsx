import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../shared/lib/axios";

function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/api/auth/login",
        form
      );

      console.log(
        "LOGIN RESPONSE",
        res.data
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <div className="h-14 w-14 mx-auto rounded-2xl bg-[#0B21BF] text-white flex items-center justify-center text-2xl">
            ✨
          </div>

          <h1 className="text-2xl font-bold mt-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Login to your AI workspace
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B21BF] hover:bg-[#3340a0] text-white rounded-xl py-3 font-medium"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-[#0B21BF] font-medium"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>

  );

}

export default LoginPage;