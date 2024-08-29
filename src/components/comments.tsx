interface IComment {
    username: string;
    commentText: string;
    datePosted: string;
  }
  
  interface ICommentsProps {
    comments: IComment[];
  }
  
  /**
   * CommentsSection Component
   *
   * Displays the latest comments for the product.
   *
   * @param {Array} comments - Array of comment objects to be displayed.
   */
  const Comments = ({ comments }: ICommentsProps) => (
    <div className="w-full mt-6 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Latest Comments</h2>
      <ul className="space-y-4">
        {comments.slice(0, 5).map((comment, index) => (
          <li key={index} className="border-b pb-4">
            <p className="font-semibold text-lg">{comment.username}</p>
            <p className="text-gray-700">{comment.commentText}</p>
            <p className="text-sm text-gray-500 mt-1">{comment.datePosted}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  export default Comments