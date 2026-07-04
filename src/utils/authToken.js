export function isTokenValid(token) {
  if (!token || typeof token !== "string") {
    return false;
  }

  const [, payload] = token.split(".");
  if (!payload) {
    return false;
  }

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "="
    );
    const decodedPayload = JSON.parse(atob(paddedPayload));

    if (!decodedPayload.exp) {
      return true;
    }

    return decodedPayload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
