export const getTranslation = (key, lang = 'ko') => {
  const dictionary = {
    greeting: { ko: '안녕하세요', en: 'Hello', ja: 'こんにちは', zh: '你好', es: 'Hola', fr: 'Bonjour', de: 'Hallo', it: 'Ciao', ru: 'Привет', vi: 'Xin chào' },
    cheer: { ko: '오늘도 활기찬 하루 되세요!', en: 'Have a great day!', ja: '今日も元気な一日を！', zh: '祝你今天过得愉快！', es: '¡Que tengas un gran día!', fr: 'Passez une bonne journée!', de: 'Einen schönen Tag noch!', it: 'Buona giornata!', ru: 'Хорошего дня!', vi: 'Chúc một ngày tốt lành!' },
    steps: { ko: '걸음 수', en: 'Steps', ja: '歩数', zh: '步数', es: 'Pasos', fr: 'Pas', de: 'Schritte', it: 'Passi', ru: 'Шаги', vi: 'Bước' },
    points: { ko: '포인트', en: 'Points', ja: 'ポイント', zh: '积分', es: 'Puntos', fr: 'Points', de: 'Punkte', it: 'Punti', ru: 'Очки', vi: 'Điểm' },
  };
  return dictionary[key]?.[lang] || dictionary[key]?.['ko'] || key;
};
