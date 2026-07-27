import axios from "axios";

/** Vedika free sandbox (dev proxied via /vedika) */
const VEDIKA_BASE =
  import.meta.env.DEV
    ? "/vedika"
    : "https://api.vedika.io";

const GEO_BASE =
  import.meta.env.DEV
    ? "/geo"
    : "https://nominatim.openstreetmap.org";

const vedika = axios.create({
  baseURL: VEDIKA_BASE,
  headers: { "Content-Type": "application/json" },
});

/**
 * Search birth place → lat/lon (OpenStreetMap Nominatim — free)
 */
export const searchPlace = async (query) => {
  const { data } = await axios.get(`${GEO_BASE}/search`, {
    params: {
      q: query,
      format: "json",
      limit: 5,
      addressdetails: 1,
    },
    headers: {
      "User-Agent": "HathDekho/1.0 (kundali feature)",
    },
  });

  return (data || []).map((p) => ({
    label: p.display_name,
    lat: Number(p.lat),
    lon: Number(p.lon),
    name: p.name || p.display_name?.split(",")[0] || query,
  }));
};

/**
 * Build ISO datetime + timezone payload for Vedika
 */
export const buildBirthPayload = ({
  date,
  time,
  latitude,
  longitude,
  timezone = "+05:30",
}) => {
  const datetime = `${date}T${time.length === 5 ? `${time}:00` : time}`;
  return {
    datetime,
    latitude: Number(latitude),
    longitude: Number(longitude),
    timezone,
  };
};

/**
 * Generate Vedic Kundali / birth chart
 * POST /sandbox/kundli
 */
export const generateKundli = async (birth) => {
  const payload = buildBirthPayload(birth);
  const { data } = await vedika.post("/sandbox/kundli", payload);
  return data;
};

/**
 * Daily Vedic horoscope prediction (uses birth details)
 * POST /sandbox/prediction/daily
 */
export const getDailyHoroscope = async (birth) => {
  const payload = buildBirthPayload(birth);
  const { data } = await vedika.post("/sandbox/prediction/daily", payload);
  return data;
};

/**
 * Weekly prediction
 */
export const getWeeklyHoroscope = async (birth) => {
  const payload = buildBirthPayload(birth);
  const { data } = await vedika.post("/sandbox/prediction/weekly", payload);
  return data;
};
