import React, { useState } from "react";

function Signup() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Sign Up</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {submitted && (
        <div style={{ color: "green", marginBottom: 10 }}>
          Signed up Successfully
        </div>
      )}
      <div style={{ marginBottom: 10 }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
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
            autoComplete="new-password"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
      </div>
      <button type="submit" style={{ padding: "8px 16px" }}>
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
