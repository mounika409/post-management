import { useParams } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = [...posts];
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p><b>Author:</b> {post.author}</p>
      <p>{post.content}</p>

      <p>
        <b>Tags:</b>{" "}
        {post.tags && post.tags.map((t, i) => (
          <span key={i} style={{ marginRight: "5px" }}>
            #{t}
          </span>
        ))}
      </p>

      <p><b>Created:</b> {new Date(post.createdAt).toLocaleString()}</p>
      <p><b>Updated:</b> {new Date(post.updatedAt).toLocaleString()}</p>

      <br />
      <br />
      <br />
<a href={`/posts/${post.id}/edit`}>Edit Post</a>

<br /><br />

<button
  onClick={() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const remaining = posts.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(remaining));
    window.location.href = "/";
  }}
>
  Delete Post
</button>

<br /><br />

<a href="/">Back to list</a>

    </div>
  );
}
