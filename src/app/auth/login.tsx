"use client";

import { useState } from "react";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { useAuth } from "@/context/auth-context";

export function LoginDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  const { loginWithEmailPassword, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
      if (onClose) onClose();
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (onClose) onClose();
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-primary-50">
      {/* Logo and Welcome Back Message */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-4xl font-semibold text-primary-900">SimplyStud.io</h1>
        <p className="mt-4 text-lg font-medium text-gray-800">Welcome back</p>
      </div>

      {/* Dialog Wrapper */}
      <div className="flex items-center justify-center h-full">
        <Dialog isOpen={isOpen} onClose={onClose}>
          <div className="space-y-6">
            {/* Google Login Button */}
            <Button
              size="medium"
              impact="bold"
              className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google Logo"
                className="h-5 w-5"
              />
              Sign in with Google
            </Button>

            {/* Separator */}
            <div className="flex items-center gap-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            {/* Email Input */}
            <Input
              id="email"
              name="email"
              label="Email address"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              showForgotPassword
              onForgotPassword={() => alert("Forgot Password Clicked")}
            />

            {/* Sign In Button */}
            <Button
              size="medium"
              impact="outline"
              className="w-full border border-primary-900 text-primary-900 hover:bg-primary-100"
              onClick={handleEmailLogin}
            >
              Sign In
            </Button>
          </div>
        </Dialog>
      </div>

      {/* Footer Text */}
      <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-primary-700 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
