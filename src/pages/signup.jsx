import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(form);

      localStorage.setItem(
        "token",
        data.access_token
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

 return (

  <div
    className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 py-10"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60" />

```
{/* Glow Effects */}
<div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full blur-[120px] opacity-20" />
<div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-400 rounded-full blur-[120px] opacity-20" />

<div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[40px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

  {/* Left Section */}
  <div className="hidden lg:flex flex-col justify-center p-12 text-white">

    <span className="text-orange-300 font-semibold mb-4">
      BEGIN YOUR SPIRITUAL JOURNEY
    </span>

    <h1 className="text-6xl font-bold leading-tight">
      Create Your
      <span className="block text-orange-400">
        Destiny Profile
      </span>
    </h1>

    <p className="mt-6 text-gray-300 text-lg">
      Join thousands of users discovering insights
      about their future through AI-powered palmistry
      and astrology.
    </p>

    <img
      src="https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=1000&q=80"
      alt="Palm Reading"
      className="mt-10 rounded-3xl h-80 object-cover"
    />

  </div>

  {/* Right Section */}
  <div className="bg-white p-10 lg:p-14">

    <div className="text-center mb-8">

      <h2 className="text-4xl font-bold">
        Create Account
      </h2>

      <p className="text-gray-500 mt-3">
        Start your AI palm reading journey today
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-400 hover:shadow-xl hover:shadow-orange-300/40 transition"
      >
        {loading
          ? "Creating Account..."
          : "Begin Your Journey"}
      </button>

    </form>

    <div className="mt-8 text-center text-gray-500">
      Already have an account?

      <Link
        to="/login"
        className="ml-2 text-orange-500 font-semibold"
      >
        Login
      </Link>
    </div>

  </div>

</div>
```

  </div>
);

}