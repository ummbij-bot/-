'use client';
import { useState } from 'react';
import Icon from './Icon';
import toast from 'react-hot-toast';

export default function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'general', label: '일반 의견', icon: 'MessageSquare' },
    { id: 'bug', label: '버그 제보', icon: 'AlertCircle' },
    { id: 'feature', label: '기능 제안', icon: 'Lightbulb' },
    { id: 'ui', label: 'UI 개선', icon: 'Layout' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('별점을 선택해주세요');
      return;
    }
    
    if (!feedback.trim()) {
      toast.error('의견을 입력해주세요');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const feedbackData = {
        rating,
        category,
        feedback: feedback.trim(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      console.log('피드백 제출:', feedbackData);
      
      if (onSubmit) {
        onSubmit(feedbackData);
      }

      toast.success('소중한 의견 감사합니다! 🙏');
      
      // Reset form
      setRating(0);
      setFeedback('');
      setCategory('general');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      {/* Rating */}
      <div className="mb-lg">
        <label className="font-bold mb-2 block">앱 만족도를 알려주세요</label>
        <div className="flex gap-2 justify-center py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="pressable transition-transform hover:scale-110"
            >
              <Icon
                name="Star"
                size={40}
                color={star <= (hoveredStar || rating) ? 'orange' : 'var(--gray-300)'}
                fill={star <= (hoveredStar || rating) ? 'orange' : 'none'}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-center text-sm text-secondary">
            {rating === 5 && '최고예요! 💖'}
            {rating === 4 && '좋아요! 😊'}
            {rating === 3 && '괜찮아요 👍'}
            {rating === 2 && '조금 아쉬워요 😐'}
            {rating === 1 && '많이 불편해요 😞'}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="mb-lg">
        <label className="font-bold mb-2 block">어떤 의견인가요?</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`p-3 rounded-lg border-2 flex items-center gap-2 justify-center transition-all ${
                category === cat.id
                  ? 'border-primary bg-orange-50 text-primary'
                  : 'border-gray-200 text-secondary hover:border-gray-300'
              }`}
            >
              <Icon name={cat.icon} size={18} />
              <span className="font-medium text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Text */}
      <div className="mb-lg">
        <label className="font-bold mb-2 block">자세한 의견을 들려주세요</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="어떤 점이 좋았나요? 또는 어떤 점이 불편했나요?"
          className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-primary"
          rows={6}
          style={{ fontSize: '16px' }}
        />
        <div className="text-right text-xs text-secondary mt-1">
          {feedback.length} / 500
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Icon name="Loader" size={20} className="animate-spin" />
            제출 중...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Icon name="Send" size={20} />
            의견 보내기
          </span>
        )}
      </button>
    </form>
  );
}
