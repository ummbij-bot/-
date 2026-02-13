/**
 * Global City Data for Seniors (Phase 10.0)
 * Includes Barrier-free trails, clean restrooms, and senior-friendly cafes.
 */

export const globalMapData = {
  tokyo: {
    name: 'Tokyo, Japan',
    center: { lat: 35.6895, lng: 139.6917 },
    spots: [
      { id: 't1', type: 'trail', name: 'Shinjuku Gyoen National Garden', tags: ['Barrier-free', 'Quiet'], lat: 35.6852, lng: 139.7101, desc: '수평이 잘 맞고 넓은 산책로가 특징입니다.' },
      { id: 't2', type: 'cafe', name: 'Silver Cafe Yoyogi', tags: ['Senior-friendly', 'Rest'], lat: 35.6715, lng: 139.7041, desc: '어르신들이 쉬어가기 좋은 차분한 카페입니다.' },
      { id: 't3', type: 'toilet', name: 'Clean Restroom Shibuya', tags: ['Accessibility'], lat: 35.6580, lng: 139.7016, desc: '휠체어 대응이 완벽한 청결한 화장실입니다.' }
    ]
  },
  newyork: {
    name: 'New York, USA',
    center: { lat: 40.7128, lng: -74.0060 },
    spots: [
      { id: 'n1', type: 'trail', name: 'High Line Park', tags: ['Elevator', 'Art'], lat: 40.7480, lng: -74.0048, desc: '엘리베이터 접근이 가능하고 볼거리가 많은 산책로입니다.' },
      { id: 'n2', type: 'park', name: 'Central Park (South)', tags: ['Benches', 'Nature'], lat: 40.7651, lng: -73.9776, desc: '벤치가 많아 중간에 쉬어가기 좋습니다.' }
    ]
  },
  seoul: {
    name: 'Seoul, Korea',
    center: { lat: 37.5665, lng: 126.9780 },
    spots: [
      { id: 's1', type: 'trail', name: 'Cheonggyecheon', tags: ['Elevator', 'Water'], lat: 37.5691, lng: 126.9787, desc: '엘리베이터를 통해 쉽게 진입 가능한 평탄한 천변 산책로입니다.' },
      { id: 's2', type: 'hospital', name: 'Seoul Senior Hospital', tags: ['Health', 'Emergency'], lat: 37.5700, lng: 126.9800, desc: '위급 상황 시 즉시 대응 가능한 파트너 병원입니다.' }
    ]
  },
  zurich: {
    name: 'Zurich, Switzerland',
    center: { lat: 47.3769, lng: 8.5417 },
    spots: [
      { id: 'z1', type: 'trail', name: 'Lake Zurich Promenade', tags: ['Flat', 'Benches'], lat: 47.3650, lng: 8.5450, desc: '호숫가를 따라 조성된 평탄하고 아름다운 산책로입니다.' },
      { id: 'z2', type: 'cafe', name: 'Old Town Senior Cafe', tags: ['Quiet', 'Accessibility'], lat: 47.3700, lng: 8.5430, desc: '취리히 구시가지의 고즈넉한 분위기를 즐길 수 있는 카페입니다.' }
    ]
  },
  paris: {
    name: 'Paris, France',
    center: { lat: 48.8566, lng: 2.3522 },
    spots: [
      { id: 'p1', type: 'trail', name: 'Jardin du Luxembourg', tags: ['Gravel', 'Historic'], lat: 48.8462, lng: 2.3371, desc: '넓은 정원과 많은 벤치가 있어 시니어들이 즐겨 찾는 명소입니다.' },
      { id: 'p2', type: 'toilet', name: 'Accessible Toilet Louvre', tags: ['Public', 'Clean'], lat: 48.8606, lng: 2.3376, desc: '관광지 중심에 위치한 장애인 대응 가능한 공공 화장실입니다.' }
    ]
  },
  osaka: {
    name: 'Osaka, Japan',
    center: { lat: 34.6937, lng: 135.5023 },
    spots: [
      { id: 'o1', type: 'park', name: 'Osaka Castle Park', tags: ['Paved', 'Slope-free'], lat: 34.6873, lng: 135.5262, desc: '경사로가 잘 정비되어 걷기 편한 성곽 공원입니다.' },
      { id: 'o2', type: 'trail', name: 'Nakanoshima Park', tags: ['River-view', 'Flat'], lat: 34.6930, lng: 135.5050, desc: '강바람을 맞으며 산책하기 좋은 도심 동산입니다.' }
    ]
  },
  hongkong: {
    name: 'Hong Kong',
    center: { lat: 22.3193, lng: 114.1694 },
    spots: [
      { id: 'h1', type: 'trail', name: 'Tsim Sha Tsui Promenade', tags: ['Elevator', 'Sea-view'], lat: 22.2930, lng: 114.1730, desc: '빅토리아 항구를 보며 걷는 무장애 해안 산책로입니다.' },
      { id: 'h2', type: 'cafe', name: 'Dim Sum Care Kowloon', tags: ['Healthy', 'Senior-menu'], lat: 22.3000, lng: 114.1700, desc: '자극적이지 않은 메뉴로 시니어에게 특화된 딤섬 맛집입니다.' }
    ]
  }
};

/**
 * 현재 위치에 가장 가까운 글로벌 도시 데이터 반환 (Mock)
 */
export const getNearestCityData = (lat, lng) => {
  // 간단한 좌표 비교 로직 (실제로는 더 정밀하게 구현 가능)
  if (lat > 35 && lat < 36 && lng > 139) return globalMapData.tokyo;
  if (lat > 40 && lat < 41) return globalMapData.newyork;
  return globalMapData.seoul;
};
