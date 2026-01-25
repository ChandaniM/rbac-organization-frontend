import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/loginService";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ❗ stop page refresh

    try {
      const response = await loginService(loginData);

      // store tenantId from API
      localStorage.setItem("tenantId", response.tenantId);
      localStorage.setItem("token", JSON.stringify(response.token))
      // // optional
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("org", JSON.stringify(response.org));

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Welcome Back to Login Page
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <Link to="/auth/Register" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
