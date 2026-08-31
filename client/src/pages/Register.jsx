import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";

import { registerUser } from "../services/authService";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Backend default role = student
      await registerUser({
        ...data,
        role: "student",
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Registration Failed"
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
          Create your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
            label="Name"
            placeholder="Enter your name"
            register={register("name")}
            error={errors.name}
          />

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
            placeholder="Enter password"
            register={register("password")}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
}

export default Register;