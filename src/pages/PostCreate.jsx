import { useState } from "react";
import { validatePost } from "../utils/validators";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const errorMessage = validatePost({ title, author, content });
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      author,
      content,
      tags: tags.split(",").map(t => t.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("posts")) || [];
    existing.push(newPost);
    localStorage.setItem("posts", JSON.stringify(existing));

    setError("");
    alert("Post created and saved!");

    setTitle("");
    setAuthor("");
    setContent("");
    setTags("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Post</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Author</label><br />
          <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Content</label><br />
          <textarea
            rows="5"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Tags (comma separated)</label><br />
          <input value={tags} onChange={e => setTags(e.target.value)} />
        </div>

        <br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

