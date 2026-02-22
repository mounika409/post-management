import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === id);

  const [title, setTitle] = useState(post?.title || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState(post ? post.tags.join(", ") : "");
  const [error, setError] = useState("");

  if (!post) return <p>Post not found</p>;

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !author || content.length < 10) {
      setError("Please fill all fields. Content must be at least 10 characters.");
      return;
    }

    const updatedPosts = posts.map(p =>
      p.id === id
        ? {
            ...p,
            title,
            author,
            content,
            tags: tags.split(",").map(t => t.trim()),
            updatedAt: new Date().toISOString()
          }
        : p
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate(`/posts/${id}`);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Post</h2>

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
          <label>Tags</label><br />
          <input value={tags} onChange={e => setTags(e.target.value)} />
        </div>

        <br />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
