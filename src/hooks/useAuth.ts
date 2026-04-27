import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setLoading, setUser } = useAuthStore();
  const login = async (email: string, pass: string) => {
    setLoading(true);
    setStatus("loading");
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass,
      );
      setUser(userCredential.user);
      setLoading(false);
      setStatus("idle");
      navigate("/dashboard");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return {
    login,
    logout,
    status,
    error,
    isLoading: status === "loading",
    isError: status === "error",
  };
};
