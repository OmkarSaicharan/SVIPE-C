// src/MapSection.jsx
import { useEffect, useRef } from "react";
import useGoogleMaps from "./useGoogleMaps";

export default function MapSection() {
  const loaded = useGoogleMaps();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 17.385, lng: 78.486 },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const geocoder = new window.google.maps.Geocoder();
    let currentLocationMarker = null;

    // Locate Me button
    const locateBtn = document.getElementById("locateMe");

    const handleLocate = () => {
      if (!navigator.geolocation) {
        alert("Geolocation not supported in this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Move map to current location
          map.setCenter(pos);
          map.setZoom(15);

          // Add / update marker
          if (currentLocationMarker) {
            currentLocationMarker.setPosition(pos);
          } else {
            currentLocationMarker = new window.google.maps.Marker({
              position: pos,
              map,
              title: "Your Location",
            });
          }

          // Reverse geocode
          geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK" && results[0]) {
              const locationName = results[0].formatted_address;
              const el = document.getElementById("currentLocation");
              if (el) el.textContent = locationName;
            }
          });
        },

        () => {
          alert("Unable to retrieve your location.");
        }
      );
    };

    if (locateBtn) locateBtn.addEventListener("click", handleLocate);

    return () => {
      if (locateBtn) locateBtn.removeEventListener("click", handleLocate);
    };
  }, [loaded]);

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ marginBottom: "1rem" }}>Our Location</h2>

        <button
          id="locateMe"
          className="btn"
          style={{ marginBottom: "1rem" }}
          type="button"
        >
          Locate In Windows
        </button>

        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "350px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        ></div>

        <p id="currentLocation" style={{ marginTop: "0.75rem" }}>
          Current location will be KL University/Vaddeswaram/vijayawada.
        </p>
      </div>
    </section>
  );
}
