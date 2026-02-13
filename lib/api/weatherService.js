/**
 * Weather & Environment Service (Phase 7.0)
 * Fetches real-time weather and air quality data
 */

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; // Optional: Mock if not provided

export const fetchWeather = async (lat, lon) => {
  try {
    // If no API Key, return mock data for demo
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_API_KEY') {
      console.log('☁️ Using mock weather data (No API Key)');
      return {
        temp: 22,
        condition: 'Clear',
        conditionKr: '맑음',
        humidity: 45,
        windSpeed: 2.1,
        fineDust: 24, // PM10
        fineDustStatus: '좋음',
        icon: '☀️'
      };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();

    // Air Quality API (PM10, PM2.5)
    const airResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const airData = await airResponse.json();
    const pm10 = airData.list[0].components.pm10;

    const getDustStatus = (val) => {
      if (val <= 30) return '좋음';
      if (val <= 80) return '보통';
      if (val <= 150) return '나쁨';
      return '매우나쁨';
    };

    const conditionMap = {
      'Clear': '맑음',
      'Clouds': '구름 많음',
      'Rain': '비',
      'Snow': '눈',
      'Drizzle': '이슬비',
      'Thunderstorm': '뇌우'
    };

    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      conditionKr: conditionMap[data.weather[0].main] || data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      fineDust: Math.round(pm10),
      fineDustStatus: getDustStatus(pm10),
      icon: data.weather[0].main === 'Clear' ? '☀️' : '☁️'
    };
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return null;
  }
};
