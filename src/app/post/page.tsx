"use client";

import { useState, useEffect } from "react";
import { Carousel } from "@/components/ui/carousel";
import { PostHeader } from "../custom _component/postHeader";
import { PostActions } from "../custom _component/postActions";
import { PostContent } from "../custom _component/postContent";
import { PostFooter } from "../custom _component/postFooter";

type LikeTypes = {
  profile: string;
  username: string;
  _id: string;
};

type PostType = {
  _id: string;
  caption: string;
  postImg: string;
  userId: {
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
    if (!token) {
      setError("No authorization token found.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ig-backend-jivr.onrender.com/posts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts: " + response.statusText);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-white bg-black">
        <span>Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-white bg-black">
        <span>{error}</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center text-white bg-black">
        <span>No posts available</span>
      </div>
    );
  }
  console.log(posts);
  return (
    <div className="flex flex-col justify-center items-center bg-black">
      <div className="text-white border-b w-screen h-10 mt-3 text-lg">
        𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶
      </div>
      {posts.map((post) => (
        <div key={post._id} className="w-fit bg-black text-white mt-10 mb-10">
          <PostHeader
            profileImg={post.userId?.profileImg}
            username={post.userId?.username}
          />
          <Carousel className="w-full max-w-xl">
            <PostContent postImg={post.postImg} />
            <PostActions />
          </Carousel>
          <PostFooter
            username={post.userId?.username}
            like={post.likes.length}
            caption={post.caption}
            id={post._id}
          />
        </div>
      ))}
    </div>
  );
};
export default Page;
