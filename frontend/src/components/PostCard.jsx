import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-teal-400 cursor-pointer">
        <h2 className="text-xl font-bold text-purple-400 hover:text-purple-300">{post.title}</h2>
        <p className="text-gray-200 mt-2 line-clamp-3">{post.content}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-amber-400 font-semibold">{post.author?.username || 'Anonymous'}</span>
          <span className="text-teal-300 font-bold">{post.upvotes?.length || 0} 👍</span>
        </div>
      </div>
    </Link>
  );
}
