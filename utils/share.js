export const shareContent = async ({ title, text, url }) => {
  const shareData = {
    title: title || 'GoldenWalk 마실',
    text: text || '오늘도 건강한 하루 보내세요!',
    url: url || window.location.href,
  };

  try {
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      return { success: true, method: 'clipboard' };
    }
  } catch (error) {
    console.error('Error sharing:', error);
    return { success: false, error };
  }
};
