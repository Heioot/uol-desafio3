import React, { useState } from "react";
import styles from "./Auth.module.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuário criado com sucesso!");
      navigate("/"); // Redireciona para a tela de login
    } catch (error) {
      console.error(error);
      alert("Erro ao criar usuário. Verifique os dados.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Bem-vindo, ${user.displayName || "usuário"}!`);
      navigate("/home");
    } catch (error: any) {
      console.error("Erro ao fazer login com Google:", error.message);
      alert("Erro ao fazer login com Google.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Audio</h1>
      <p className={styles.subtitle}>It's modular and designed to last</p>
      <form onSubmit={handleSignUp} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <button onClick={handleGoogleSignIn} className={styles.googleButton}>
        <FcGoogle size={20} />
        Sign up with Google
      </button>
      <p className={styles.footer}>
        If you have an account?{" "}
        <span onClick={() => navigate("/")}>Sign In here</span>
      </p>
    </div>
  );
};

export default SignUp;
