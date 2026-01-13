import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupApi, type Role } from "@/lib/authApi";
import { saveAuth } from "@/lib/authStore";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const r = searchParams.get("role");
    if (r === "student" || r === "teacher" || r === "parent" || r === "admin") {
      setRole(r);
    }
  }, [searchParams]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const data = await signupApi({ name, email, password, role });

      saveAuth(data.token, data.user);

      // role based redirect
      if (data.user.role === "student") navigate("/student/dashboard");
      if (data.user.role === "teacher") navigate("/teacher/dashboard");
      if (data.user.role === "parent") navigate("/parent/dashboard");
      if (data.user.role === "admin") navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold font-display mb-2">Create Account</h1>
        <p className="text-muted-foreground mb-6">Signup to continue</p>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="w-full p-2 border rounded-md bg-background"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
