import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getReviews, addReview } from '../services/supabaseService';
import { Star, Send, User as UserIcon } from 'lucide-react';

interface ReviewListProps {
  craftsmanId: string;
  initialReviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({
  craftsmanId,
  initialReviews
}) => {
  const { t } = useLanguage();
  const { user, requireAuth } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [commentText, setCommentText] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getReviews(craftsmanId).then(loadedReviews => {
      if (isMounted && loadedReviews && loadedReviews.length > 0) {
        setReviews(loadedReviews);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [craftsmanId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    requireAuth(async () => {
      setIsSubmitting(true);
      const author = user?.name || 'Customer';
      const created = await addReview(
        craftsmanId,
        author,
        selectedRating,
        commentText.trim(),
        user?.id
      );

      if (created) {
        setReviews(prev => [created, ...prev]);
      }
      setCommentText('');
      setIsSubmitting(false);
    }, 'Please log in to share your experience with this craftsman.');
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-stone-100 dark:border-stone-800/80">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
        <h4 className="font-semibold text-lg text-stone-900 dark:text-stone-100">
          {t.commentsTitle}
        </h4>
        <span className="text-xs text-stone-400 font-medium">
          {reviews.length} reviews
        </span>
      </div>

      {/* Reviews list with custom scrollbar */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-72 overflow-y-auto pr-1 mt-2">
        {reviews.map(rev => (
          <div key={rev.id} className="py-3.5 flex items-start gap-3">
            {/* Gray circular avatar exactly as in screenshot 4 */}
            <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center shrink-0 mt-0.5 text-stone-600 dark:text-stone-300">
              <UserIcon className="w-4 h-4 fill-stone-400 dark:fill-stone-600 text-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  {rev.author}
                </span>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>

              {/* Star rating in signature terracotta color #BE826A */}
              <div className="flex items-center gap-0.5 my-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= rev.rating
                        ? 'fill-[#BE826A] text-[#BE826A]'
                        : 'text-stone-300 dark:text-stone-600'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {rev.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add comment input matching screenshot 4 */}
      <form onSubmit={handleAddComment} className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-stone-400">Rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                className="cursor-pointer focus:outline-none"
              >
                <Star
                  className={`w-4 h-4 transition-transform hover:scale-125 ${
                    star <= selectedRating
                      ? 'fill-[#BE826A] text-[#BE826A]'
                      : 'text-stone-300 dark:text-stone-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#F8F7F4] dark:bg-stone-900/60 rounded-xl px-3 py-2 border border-stone-200 dark:border-stone-700/80 focus-within:border-[#BE826A] transition-colors">
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder={t.addCommentPlaceholder}
            className="flex-1 bg-transparent text-xs text-stone-800 dark:text-stone-100 focus:outline-none placeholder:text-stone-400"
          />

          <button
            type="submit"
            disabled={!commentText.trim() || isSubmitting}
            className="flex items-center gap-1 text-[#BE826A] hover:text-[#A96E57] disabled:opacity-40 font-medium text-xs cursor-pointer transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.sendBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
