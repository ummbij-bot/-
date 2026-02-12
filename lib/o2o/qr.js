/**
 * qr.js
 * Utilities for O2O QR Check-in System.
 */

// Generate a Time-based OTP (TOTP) style token for the user
export function generateUserQRToken(userId) {
    const timestamp = Math.floor(Date.now() / 1000 / 60); // Changes every minute
    return `GW-USER-${userId}-${timestamp}`;
}

// Validate the token (Server-side logic simulation)
export function validateQRToken(token) {
    if (!token.startsWith('GW-USER-')) return { valid: false, error: '잘못된 QR 코드입니다.' };
    
    const parts = token.split('-');
    const timestamp = parseInt(parts[3]);
    const current = Math.floor(Date.now() / 1000 / 60);

    // Allow 2-minute window drift
    if (Math.abs(current - timestamp) > 2) {
        return { valid: false, error: '만료된 QR 코드입니다. 새로고침 해주세요.' };
    }

    return { valid: true, userId: parts[2], points: 50 };
}
