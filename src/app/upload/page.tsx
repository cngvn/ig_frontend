"use client";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { House } from "lucide-react";
import { Search } from "lucide-react";
import { User } from "lucide-react";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

const Upload = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [upld, setUpld] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const token = localStorage.getItem("accessToken");
  let decodedToken: any = null;

  try {
    decodedToken = token ? jwtDecode(token) : null;
  } catch (error) {
    console.error("Invalid token", error);
  }

  const up = async () => {
    if (!images) return;
    setIsLoading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(images).map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "cngvne");
        formData.append("cloud_name", "dh9bx6kc7");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dh9bx6kc7/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        return result.secure_url;
      });

      const uploaded = await Promise.all(uploadPromises);
      setUpld(uploaded.filter((url) => url !== null) as string[]);

      if (decodedToken?.userId) {
        await create(uploaded);
      } else {
        throw new Error("id not found");
      }
    } catch (error) {
      setError("errrrooorrrr");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const create = async (upld: string[]) => {
    try {
      const response = await fetch(
        "https://ig-backend-jivr.onrender.com/posts/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postImg: upld[0],
            userId: decodedToken?.userId,
            caption: caption,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const result = await response.json();
      console.log("Instagram post created:", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setImages(files);
          }
        }}
        className="file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
      />

      <button
        onClick={up}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      <input
        type="text"
        placeholder="Write a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mt-4 px-4 py-2 border border-gray-300 rounded-md w-full"
      />

      {error && (
        <div className="mt-4 text-red-600 text-center">
          <p>{error}</p>
        </div>
      )}

      <div className="mt-4 text-center">
        {upld.map((img, index) => (
          <img
            key={index}
            src={img}
            className="max-w-full h-[300px] rounded-lg shadow-lg"
            alt={`Uploaded ${index + 1}`}
          />
        ))}
        <div className="fixed bottom-0  left-0 grid w-full h-10 grid-cols-1 px-8 bg-black border-t border-black-500  white:bg-gray-700 white:border-gray-600">
          <div className="flex justify-between p-2">
            <Link href={"/post"}>
              <House color="white" />
            </Link>
            <Link href={"/search"}>
              <Search color="white" />
            </Link>
            <Link href={"/upload"}>
              <SquarePlus color="white" />
            </Link>
            <Link href={`post`}>
              <img
                className="h-[25px] w-[25px] rounded-full"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
