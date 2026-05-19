const FALLBACK_RATE = 361.84;
const ENDPOINT = "https://api.frankfurter.app/latest?from=EUR&to=HUF";

export type FxRate = {
  rate: number;
  fetchedAt: Date;
  isFallback: boolean;
};

export async function getEurHufRate(): Promise<FxRate> {
  try {
    const response = await fetch(ENDPOINT, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`status ${response.status}`);
    const data = (await response.json()) as { rates?: { HUF?: number } };
    const huf = data.rates?.HUF;
    if (typeof huf !== "number" || !Number.isFinite(huf)) {
      throw new Error("invalid rate payload");
    }
    return { rate: huf, fetchedAt: new Date(), isFallback: false };
  } catch {
    return { rate: FALLBACK_RATE, fetchedAt: new Date(), isFallback: true };
  }
}
