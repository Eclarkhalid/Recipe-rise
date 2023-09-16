import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
  _id: string;
  title: string;
  summary: string;
  cover: string;
  content: string;
  createdAt: Date; // Specify the type as Date
  author: { username: string };
}

const formatDate = (date: Date | string): string => {
  // Check if it's already a Date object
  if (date instanceof Date) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // If it's a string, attempt to parse it as a Date
  const parsedDate = new Date(date);
  if (!isNaN(parsedDate.getTime())) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return parsedDate.toLocaleDateString('en-US', options);
  }

  // Return a default value if parsing fails
  return 'Invalid Date';
};



const Post: React.FC<PostProps> = ({ _id, title,  cover, createdAt, author }) => {
  return (
    <>
      <Link to={`/post/${_id}`} className="w-[250px] overflow-hidden rounded-lg bg-white shadow">
        <img src={`http://localhost:4000/${cover}`} className="aspect-video w-full object-cover" alt="" />
        <div className="p-4">
          <p className="mb-1 text-sm text-green-500 font-medium">
            {author.username} • <time>{formatDate(createdAt)}</time> {/* Format the date */}
          </p>
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
              follow
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
              followers
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
              views
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
