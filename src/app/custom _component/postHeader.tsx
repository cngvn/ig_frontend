import { Ellipsis } from "lucide-react";

export const PostHeader = ({
  profileImg,
  username,
}: {
  profileImg: string;
  username: string;
}) => {
  return (
    <div className="flex">
      <div>
        <img className="h-10 w-12 rounded-full mb-2" src={profileImg}></img>
      </div>
      <div className="mt-2 ml-2 flex justify-between w-full mr-2">
        {username}
        <Ellipsis />
      </div>
    </div>
  );
};
