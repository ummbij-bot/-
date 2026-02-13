/**
 * GeoFence Engine (Phase 7.0)
 * Detects when user enters predefined risk zones
 */

const RISK_ZONES = [
  { id: 'CONSTRUCTION_1', name: '공사 현장', lat: 37.5665, lon: 126.9780, radius: 50, msg: '이 근처는 공사 중이라 바닥이 미끄러울 수 있어요. 조심하세요!' },
  { id: 'STEEP_HILL_1', name: '가파른 언덕', lat: 37.5670, lon: 126.9800, radius: 40, msg: '앞에 가파른 언덕이 있습니다. 무릎 건강을 위해 천천히 걸으세요.' },
];

export class GeoFenceManager {
  constructor(onEnter) {
    this.onEnter = onEnter;
    this.activeZones = new Set();
  }

  checkProximity(lat, lon) {
    RISK_ZONES.forEach(zone => {
      const distance = this.calculateDistance(lat, lon, zone.lat, zone.lon);
      
      if (distance <= zone.radius) {
        if (!this.activeZones.has(zone.id)) {
          this.activeZones.add(zone.id);
          this.onEnter(zone);
        }
      } else {
        this.activeZones.delete(zone.id);
      }
    });
  }

  // Haversine formula to calculate distance in meters
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
