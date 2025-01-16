"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type tokenType = { userId: string; username: string };
type userType = {
  username: string;
  profileImage: string;
};
const Page = () => {
  const router = useRouter();
  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken: tokenType = jwtDecode(token);
  const accountId = decodedToken.userId;
  const [user, setUser] = useState<userType>();
  const [username, setUsername] = useState<string | undefined>(user?.username);

  const getUser = async () => {
    const jsonData = await fetch(
      `https:/ig-backend-jivr.onrender.com/getOneUser/${accountId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await jsonData.json();
    setUser(response);
  };

  useEffect(() => {
    if (!token) {
      router.push("/signup");
    } else {
      getUser();
    }
  }, []);

  const [image, setImage] = useState<File | null>(null);

  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ace_area");
    formData.append("cloud_name", "dl93ggn7x");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
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
  };
  const update = async () => {
    const uploadedImages = await uploadImage();
    const body = {
      username: username === undefined ? user?.username : username,
      profileImage:
        uploadedImages === undefined ? user?.profileImage : uploadedImages,
      userId: accountId,
    };
    await fetch(" https://instagram-server-8xvr.onrender.com/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  };
  return (
    <div className="bg-black w-screen h-screen flex flex-col gap-5 ">
      <div className="flex">
        {" "}
        <ChevronLeft
          className="text-white"
          onClick={() => {
            router.replace(`/profile/${accountId}`);
          }}
        />
        <div className="italic text-xl bg-black text-white pl-6">
          Edit profile
        </div>
      </div>
      <div className="flex flex-col align-center gap-2 justify-center">
        {" "}
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files;
            if (file) {
              setImage(file[0]);
            }
          }}
          className="file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100 border-none"
        />
        <div className="flex items-center px-6">
          <div className="text-white w-2/5">Username</div>
          <Input
            type="text"
            placeholder="Username"
            className="border-none text-white"
            value={username}
            defaultValue={user?.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              update();
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
