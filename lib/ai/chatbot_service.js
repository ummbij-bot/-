/**
 * chatbot_service.js
 * Simulates Dr. Masil (LLM) Chatbot response.
 */

export async function sendMessageToDrMasil(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    // Simple keywords matching for demo (RAG simulation)
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('무릎') || lowerMsg.includes('아파')) {
        return "무릎 통증이 있으시군요. 😥\n\n1. **냉찜질**: 부기가 있다면 15분간 냉찜질을 해주세요.\n2. **휴식**: 오늘은 무리한 걷기를 피하시고 평지를 짧게 걸어주세요.\n\n통증이 지속된다면 가까운 '종로 정형외과(02-123-4567)' 방문을 추천드립니다.";
    }
    
    if (lowerMsg.includes('혈압') || lowerMsg.includes('어지러')) {
        return "혈압 관리가 중요합니다! 🩺\n\n지금 즉시 잠시 앉아서 휴식을 취해주세요. 수분을 충분히 섭취하시고, 30분 후에도 어지러움이 지속되면 보호자에게 연락하세요.\n\n최근 걷기 기록을 보니 어제보다 활동량이 급격히 늘었습니다. 천천히 강도를 조절하세요.";
    }
    
    if (lowerMsg.includes('안녕')) {
        return "안녕하세요! 닥터 마실입니다. 👨‍⚕️\n\n오늘 컨디션은 어떠신가요? 불편하신 곳이 있다면 언제든 말씀해 주세요. 부모님의 건강 데이터를 기반으로 친절히 안내해 드릴게요.";
    }
  
    return "제가 정확히 이해하지 못했습니다. 😅\n\n'무릎이 아파요' 또는 '혈압이 높아요' 처럼 구체적인 증상을 말씀해 주시면 더 정확한 조언을 해드릴 수 있어요.";
}
