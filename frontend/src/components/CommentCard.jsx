export default function CommentCard({ comment }) {
  return (
    <div className="bg-gray-700 p-3 rounded-xl shadow-md hover:shadow-lg mt-2 transition">
      <span className="text-amber-300 font-semibold">{comment.author.username}</span>: {comment.text}
      <div className="text-teal-300 text-sm mt-1">{comment.upvotes.length} 👍</div>
    </div>
  );
}