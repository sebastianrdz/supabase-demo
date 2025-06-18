import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Dashboard({ user }) {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("entries").insert([
      {
        title: form.title,
        description: form.description,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert("Error adding entry: " + error.message);
    } else {
      // setTitle("");
      // setDescription("");
      setForm({ title: "", description: "" });

      loadEntries(); // Refresh the list
    }
    setSubmitting(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      navigate("/login");
    }
  };

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setLoading(false);
    if (!error) setEntries(data);
  };

  useEffect(() => {
    if (user) loadEntries();
  }, [user]);

  return (
    <main className="home-container">
      <div className="hero" style={{ maxWidth: 700 }}>
        <h1 className="hero-title">
          Book <span className="highlight">Entries</span>
        </h1>
        <button
          className="cta-btn"
          style={{ marginBottom: 24 }}
          onClick={handleLogout}
        >
          Logout
        </button>

        <form className="entry-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="form-textarea"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <button className="cta-btn" type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Entry"}
          </button>
        </form>
        <div style={{ marginTop: 40 }}>
          {loading ? (
            <p className="hero-desc">Loading...</p>
          ) : entries.length === 0 ? (
            <p className="hero-desc">No entries found.</p>
          ) : (
            <ul className="entry-list">
              {entries.map((entry) => (
                <li className="entry-item" key={entry.id}>
                  <div className="entry-title">{entry.title}</div>
                  <div className="entry-content">{entry.description}</div>
                  <div className="entry-meta">ID: {entry.id}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
