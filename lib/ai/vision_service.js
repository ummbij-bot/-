/**
 * vision_service.js
 * Simulates Google Gemini Pro Vision API for 'Family Snap' feature.
 * In production, this would call the actual API endpoint.
 */

export async function analyzePhoto(file) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  
    // Simulated Analysis Result (Mock)
    // In a real app, 'file' would be sent to Gemini Vision API.
    const mockResponses = [
      {
        emotion: "Happy & Energetic",
        score: 85,
        context: "Park / Nature",
        message_to_family: "부모님의 표정이 매우 밝습니다! 공원에서 산책 중이신 것 같네요. 활력이 넘치는 모습이니 안심하셔도 좋습니다. 🌸",
        health_insight: "보행 자세가 안정적이며, 턱을 들고 시선을 전방에 둔 좋은 자세입니다."
      },
      {
        emotion: "Calm & Relaxed",
        score: 75,
        context: "City / Street",
        message_to_family: "편안한 표정으로 산책을 즐기고 계십니다. 다만 약간 피로해 보이시니 저녁에는 따뜻한 물로 족욕을 권해드리는 건 어떨까요? 🍵",
        health_insight: "어깨가 약간 굽어 있습니다. 스트레칭을 권장합니다."
      },
      {
        emotion: "Focused",
        score: 90,
        context: "Market / Shopping",
        message_to_family: "무언가에 집중하고 계신 모습이네요! 활기찬 시장 나들이 중이신가 봅니다. 인지 기능 자극에 아주 좋은 활동입니다! 🍎",
        health_insight: "활동량이 많아 보입니다. 수분 섭취가 필요할 수 있습니다."
      }
    ];
  
    // Randomly select a response for demo variety
    const result = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    return result;
  }
