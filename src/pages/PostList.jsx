import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function PostList() {
    const [posts, setPosts] = useState([]);

    const [search, setSearch] = useState("");
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>All Posts</h2>
      <input
  type="text"
  placeholder="Search by title..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ marginBottom: "15px", padding: "5px", width: "100%" }}
/>


{filteredPosts.length === 0 && <p>No matching posts.</p>}

      {filteredPosts.map(post => (

        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
         <a href={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
  <h3>{post.title}</h3>
</a>
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
        </div>
      ))}
    </div>
  );
}
