"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

const Page = () => {
  const [isFollowing, setIsFollowing] = useState(true);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-black h-screen p-5 flex flex-col justify-between">
      <div className="flex justify-center border-b-[2px] border-zinc-700 pb-40">
        <img
          className="w-40 h-40 rounded-full"
          src="https://www.dexerto.com/cdn-image/wp-content/uploads/2024/07/30/my-hero-academia-toga.jpg"
          alt="Character from My Hero Academia"
        />
        <div>
          <div className="text-white ml-5 font-semibold flex mb-5">
            <div className="text-xl">bnnhuslen</div>
            <button
              onClick={toggleFollow}
              className={`ml-5 w-28 rounded-md px-4 text-white font-semibold transition-all duration-300 ease-in-out ${
                isFollowing
                  ? "bg-neutral-800 hover:bg-neutral-700 shadow-md hover:shadow-lg"
                  : "bg-blue-600 hover:bg-blue-500 shadow-sm hover:shadow-md"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <Settings className="ml-5" />
          </div>
          <div className="flex ml-5">
            <div className="text-white font-semibold">9 posts</div>
            <div className="text-white font-semibold ml-5">134 followers</div>
            <div className="text-white font-semibold ml-5">186 following</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-2 justify-center mt-8 sm:mt-10 h-screen">
        <img
          className="w-full sm:w-1/3 h-96 object-cover"
          src="https://s.hdnux.com/photos/01/36/02/51/24652370/1/1082x0.jpg"
          alt="Gallery Image 1"
        />
        <img
          className="w-full sm:w-1/3 h-96 object-cover"
          src="https://s.hdnux.com/photos/01/36/02/51/24652370/1/1082x0.jpg"
          alt="Gallery Image 2"
        />
        <img
          className="w-full sm:w-1/3 h-96 object-cover"
          src="https://s.hdnux.com/photos/01/36/02/51/24652370/1/1082x0.jpg"
          alt="Gallery Image 3"
        />
      </div>
    </div>
  );
};

export default Page;
