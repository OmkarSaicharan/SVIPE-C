// src/useGoogleMaps.js
import { useEffect, useState } from "react";

const GOOGLE_MAPS_SRC =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyADC_7euvIbHyQDnxiru3KVbzm5UnXliJo&libraries=places";

export default function useGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // already loaded
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    // avoid adding the script multiple times
    const existingScript = document.querySelector(
      `script[src^="https://maps.googleapis.com/maps/api/js"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setLoaded(true));
      existingScript.addEventListener("error", () =>
        console.error("Google Maps failed to load")
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&libraries=places" ; // put your real API key here
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Google Maps failed to load");
    document.body.appendChild(script);
  }, []);

  return loaded;
}
