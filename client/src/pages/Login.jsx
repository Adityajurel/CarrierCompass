
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

import { loginSchema } from "../schemas/loginSchema";

import { loginUser } from "../services/authService";

import Card from "../components/common/Card";

import Input from "../components/common/Input";

import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  // Home page se email aa rahi hai
  const emailFromHome = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromHome,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      console.log("Login response:", response);

      // User ko Auth Context me save karo
      login(response.data.user);

      toast.success("Login Successful");

      // Dashboard par redirect
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5">
      <Card className="w-full max-w-md">

        <h1 className="mb-2 text-center text-3xl font-bold text-cyan-400">
          CareerCompass AI
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Login to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

        </form>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </Card>
    </div>
  );
}

export default Login;

