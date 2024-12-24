"use client";
import { useState, useEffect } from "react";

type LikeTypes = {
  profile: string;
  username: string;
  _id: string;
};

type PostType = {
  _id: string;
  caption: string;
  postImg: string;
  userid: {
    username: string;
    profileImg: string;
  };
  likes: LikeTypes[];
};

const Page = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (!token) {
      setError("no authorization token found.");
      setLoading(false);
      return;
    }

    try {
      const jsonData = await fetch(
        "https://ig-backend-jivr.onrender.com/posts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!jsonData) {
        throw new Error("Failed to fetch posts");
      }

      const response = await jsonData.json();
      console.log(response);

      setPosts(response);
    } catch (err) {
      console.log("Error fetching posts:", err);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: "20px" }}>
            <div style={{ fontWeight: "bold" }}>{post.userid.username}</div>
            <div>{post.caption}</div>
            <img
              src={post.postImg}
              alt="Post Image"
              style={{ width: "100%", height: "auto", marginTop: "10px" }}
            />
            <div>
              <p>Likes:</p>
              {post.likes.length > 0 ? (
                post.likes.map((like) => (
                  <div key={like._id}>
                    <span>{like.username}</span>
                  </div>
                ))
              ) : (
                <p>No likes yet</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
