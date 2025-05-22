// src/components/SignUpForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpData = z.infer<typeof SignUpSchema>;

export function SignUpForm({ fromLogin }: { fromLogin?: boolean }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  function onSubmit(data: SignUpData) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (fromLogin) {
      const foundUser = users.find(
        (user: SignUpData) =>
          user.email === data.email && user.password === data.password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        toast.success("Logged in successfully!");
        navigate("/todos");
      } else {
        toast.error("Invalid credentials!");
      }
    } else {
      const alreadyExists = users.find((user: SignUpData) => user.email === data.email);
      if (alreadyExists) {
        toast.error("User already exists!");
        return;
      }

      const updatedUsers = [...users, data];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(data));
      toast.success("Signed up successfully!");
      navigate("/todos");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      {!fromLogin && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input placeholder="First Name" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-xs text-red-600 ml-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Input placeholder="Last Name" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-xs text-red-600 ml-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <Input placeholder="Email Address" {...register("email")} className="w-full" />
        {errors.email && <p className="text-xs text-red-600 ml-1">{errors.email.message}</p>}
      </div>

      <div className="relative space-y-1">
        <Input
          type={show ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
          className="w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        {errors.password && <p className="text-xs text-red-600 ml-1">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting} variant="destructive">
        {isSubmitting
          ? fromLogin
            ? "Logging in…"
            : "Signing up…"
          : fromLogin
          ? "Log In"
          : "Sign Up"}
      </Button>
    </form>
  );
}

