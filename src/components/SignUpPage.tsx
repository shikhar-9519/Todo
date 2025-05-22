// src/pages/SignUpPage.tsx
import { AuthLayout } from "@/components/AuthLayout";
import { SignUpForm } from "@/components/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <AuthLayout>
      {/* Title moved to the top-left */}
      <div className="absolute top-4 left-4 flex items-center">
        <img src="/images/todo-logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold">Todo</h1>
      </div>

      <div className="max-w-md mx-auto w-full">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">Sign Up to Todo</h1>
        </div>
        <SignUpForm />
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#D52121] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
