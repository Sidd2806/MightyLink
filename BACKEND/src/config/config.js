export const cookieOptions= {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // For deployed frontend (different origin) we must set SameSite to 'none'
    // so the browser accepts the cookie on cross-site POST requests.
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 // 1 hour
}