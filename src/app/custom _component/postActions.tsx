import { MessageCircle, Send, Bookmark, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface PostActionsProps {
  postId: string;
  userId: string;
}

export const PostActions = ({ postId, userId }: PostActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const checkIfLiked = async () => {
    try {
      const response = await fetch(`https://ig-backend-jivr.onrender.com/like`);

      if (response.ok) {
        const data = await response.json();

        setIsLiked(data.likes.includes(userId));
      } else {
        console.log("Failed to fetch post likes");
      }
    } catch (error) {
      console.log("Error checking like status:", error);
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      const response = await fetch(
        "https://ig-backend-jivr.onrender.com/like",
        {
          method: "POST",
          body: JSON.stringify({
            postId,
            userId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsLiked(!isLiked);
      } else {
        console.log("Failed to like the post");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="flex justify-between mt-2 mb-2">
      <div className="flex gap-x-2 ml-2">
        <button onClick={handleLike}>
          <Heart color={isLiked ? "red" : "gray"} />
        </button>
        <MessageCircle />
        <Send />
      </div>
      <div className="mr-2">
        <Bookmark />
      </div>
    </div>
  );
};
