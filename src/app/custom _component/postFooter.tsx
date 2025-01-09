import Link from "next/link";

export const PostFooter = ({
  username,
  like,
  caption,
  id,
}: {
  username: string;
  like: number;
  caption: string;
  id: string;
}) => {
  return (
    <>
      <div className="ml-3">{like} likes</div>
      <div className="flex">
        <div className="text-xs font-semibold ml-3">{username}</div>
        <div className="text-xs ml-1">{caption}</div>
      </div>
      <Link href={`/comments/${id}`} className="text-xs text-gray-400 ml-3">
        view all comments
      </Link>
    </>
  );
};
