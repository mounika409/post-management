export function validatePost({ title, author, content }) {
    if (!title || !author || !content) {
      return "All fields are required.";
    }
  
    if (content.length < 10) {
      return "Content must be at least 10 characters.";
    }
  
    return null;
  }
  