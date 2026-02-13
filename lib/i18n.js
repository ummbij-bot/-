export const translations = {
  ko: {
    // Common
    greeting: "안녕하세요",
    steps: "걸음 수",
    points: "포인트",
    goal: "목표",
    cheer: "오늘도 힘차게 걸어보세요!",
    
    // Bottom Bar
    nav_home: "홈",
    nav_map: "지도",
    nav_community: "커뮤니티",
    nav_shop: "상점",
    nav_profile: "MY",

    // Community Page (Phase 8.0/9.0)
    community_title: "우리 동네 커뮤니티 🌳",
    global_community_title: "전 세계 마실 친구 🌍",
    snap_show: "📸 마실 사진전",
    buddy_matching: "🤝 동네 마실 친구",
    donation_title: "❤️ 마실 마음 나눔",
    ranking_title: "🏆 우리 동네 랭킹",
    donate_btn: "기부하기",
    buddy_suggest: "마실 제안",

    // Health Page & AI Concierge (Phase 9.0)
    health_title: "건강 리포트 📊",
    health_forecast: "AI 건강 컨시어지 🔮",
    forecast_msg: "보행 데이터를 분석한 미래 건강 예측입니다.",
    health_age: "보행 나이",
    expected_score: "다음 주 예상 활력",
    ai_advice_title: "AI 활력 조언",
    
    // Partner Portal
    partner_btn: "🏪 매장주 포털 (Partner Alpha)"
  },
  en: {
    greeting: "Hello",
    steps: "Steps",
    points: "Points",
    goal: "Goal",
    cheer: "Walk with vitality today!",
    nav_home: "Home",
    nav_map: "Map",
    nav_community: "Community",
    nav_shop: "Shop",
    nav_profile: "MY",
    community_title: "Local Community 🌳",
    global_community_title: "Global Buddies 🌍",
    snap_show: "📸 Walk Gallery",
    buddy_matching: "🤝 Nearby Buddies",
    donation_title: "❤️ Share Vitality",
    ranking_title: "🏆 Neighborhood Ranking",
    donate_btn: "Donate",
    buddy_suggest: "Suggest Walk",
    health_title: "Health Report 📊",
    health_forecast: "AI Health Concierge 🔮",
    forecast_msg: "Health prediction based on your walking habits.",
    health_age: "Gait Age",
    expected_score: "Next Week Prediction",
    ai_advice_title: "AI Vitality Advice",
    partner_btn: "🏪 Partner Portal (Alpha)"
  },
  ja: {
    greeting: "こんにちは",
    steps: "歩数",
    points: "ポイント",
    goal: "目標",
    cheer: "今日も元気に歩きましょう！",
    nav_home: "ホーム",
    nav_map: "地図",
    nav_community: "コミュニティ",
    nav_shop: "ショップ",
    nav_profile: "MY",
    community_title: "近所コミュニティ 🌳",
    global_community_title: "世界のお散歩友達 🌍",
    snap_show: "📸 お散歩写真展",
    buddy_matching: "🤝 お散歩友達探し",
    donation_title: "❤️ 散歩の心の共有",
    ranking_title: "🏆 地域ランキング",
    donate_btn: "寄付する",
    buddy_suggest: "散歩の提案",
    health_title: "健康レポート 📊",
    health_forecast: "AI 健康コンシェルジュ 🔮",
    forecast_msg: "歩行データに基づいた健康予測です。",
    health_age: "歩行年齢",
    expected_score: "来週の予測活力",
    ai_advice_title: "AI 活力アドバイス",
    partner_btn: "🏪 加盟店ポータル (Alpha)"
  },
  zh: {
    greeting: "你好",
    steps: "步数",
    points: "积分",
    goal: "目标",
    cheer: "今天也充满活力地散步吧！",
    nav_home: "首页",
    nav_map: "地图",
    nav_community: "社区",
    nav_shop: "商店",
    nav_profile: "我的",
    community_title: "邻里社区 🌳",
    global_community_title: "全球散步伙伴 🌍",
    snap_show: "📸 散步摄影展",
    buddy_matching: "🤝 寻找邻里伙伴",
    donation_title: "❤️ 爱心捐赠",
    ranking_title: "🏆 邻里排行榜",
    donate_btn: "捐赠",
    buddy_suggest: "提议散步",
    health_title: "健康报告 📊",
    health_forecast: "AI 健康助手 🔮",
    forecast_msg: "基于您的步行数据的健康预测。",
    health_age: "步态年龄",
    expected_score: "下周活力预测",
    ai_advice_title: "AI 活力建议",
    partner_btn: "🏪 合作伙伴门户 (Alpha)"
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['ko'][key] || key;
};
