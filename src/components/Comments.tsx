import { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import type { Comment } from '../App';

interface CommentsProps {
  recipeId: string;
  comments: Comment[];
  currentUserName: string;
  currentUserAvatar: string;
  onAddComment: (recipeId: string, text: string) => void;
  onLikeComment: (commentId: string) => void;
}

export function Comments({
  recipeId,
  comments,
  currentUserName,
  currentUserAvatar,
  onAddComment,
  onLikeComment,
}: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    onAddComment(recipeId, newComment.trim());
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div id="comments-section" className="space-y-4">
      <h3 className="text-[#8B4513] text-xl mb-4">Comments ({comments.length})</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={currentUserAvatar} alt={currentUserName} />
            <AvatarFallback>{currentUserName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] border-[#DEB887] focus:border-[#8B4513] resize-none"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="mt-2 bg-[#8B4513] hover:bg-[#A0522D] text-white"
              size="sm"
            >
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-[#A0522D]">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg p-4 border border-[#DEB887]"
            >
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#8B4513] font-semibold">{comment.author}</span>
                    <span className="text-[#A0522D] text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-[#A0522D] mb-2">{comment.text}</p>
                  <button
                    onClick={() => onLikeComment(comment.id)}
                    className="flex items-center gap-1 text-[#A0522D] hover:text-[#8B4513] transition-colors text-sm"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Like</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


