// src/useGoogleMaps.js
import { useEffect, useState } from "react";

export default function useGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    // Avoid loading script again
    const existingScript = document.querySelector("script[data-gmaps]");
    if (existingScript) {
      existingScript.addEventListener("load", () => setLoaded(true));
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyADC_7euvIbHyQDnxiru3KVbzm5UnXliJo&libraries=places";
    script.async = true;
    script.defer = true;
    script.dataset.gmaps = "true";

    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Google Maps failed to load");

    document.body.appendChild(script);
  }, []);

  return loaded;
}
