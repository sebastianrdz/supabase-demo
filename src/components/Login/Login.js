import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setError(error ? error.message : "");
    setSubmitted(error ? false : true);
    // redirect to dashboard or home page on successful login
    if (error) {
      setError(error.message);
    } else {
      navigate("/home");
    }

    // console.log(form.email, form.password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {submitted && (
        <div style={{ color: "green", marginBottom: 10 }}>
          Logged In Successfully
        </div>
      )}
      <div style={{ marginBottom: 10 }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
      </div>
      <button type="submit" style={{ padding: "8px 16px" }}>
        Login
      </button>
    </form>
  );
}

export default Login;
