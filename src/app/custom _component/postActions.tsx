import { MessageCircle, Send, Bookmark, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export const PostActions = ({
  postId,
  userId,
}: {
  postId: string;
  userId: { username: string; profileImg: string; _id: string };
}) => {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(
          `https://ig-backend-jivr.onrender.com/check-like`,
          {
            method: "POST",
            body: JSON.stringify({
              postId,
              userId: userId._id,
            }),
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.isLiked);
        }
      } catch (error) {
        console.log("Error ", error);
      }
    };

    checkLikeStatus();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      const method = isLiked ? "DELETE" : "POST";
      const url = `https://ig-backend-jivr.onrender.com/like`;

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          postId,
          userId: userId._id,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLiked((prev) => !prev);
      } else {
        console.log("errr");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex justify-between mt-2 mb-2">
      <div className="flex gap-x-2 ml-2">
        <button onClick={handleLike}>
          <Heart
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "black"}
          />
        </button>
        <Link href={`comments/${postId}`}>
          <MessageCircle />
        </Link>
        <Send />
      </div>
      <div className="mr-2">
        <Bookmark />
      </div>
    </div>
  );
};
