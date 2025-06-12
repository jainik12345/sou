import { useEffect, useState } from "react";
import BE_URL from "../../../config";

function extractIframeSrc(html) {
  if (!html) return "";
  const match = html.match(/src\s*=\s*['"]([^'"]+)['"]/i);
  return match ? match[1] : "";
}

export const ContactMap = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BE_URL}/contactPage`)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.status === "success" &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setContact(data.data[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading map...</div>;
  if (!contact) return <div>Map not available</div>;

  let mapSrc = "";

  if (contact.map_link?.includes("<iframe")) {
    mapSrc = extractIframeSrc(contact.map_link);
  }
  // If map_link is already an embed URL, use as is
  else if (contact.map_link?.startsWith("https://www.google.com/maps/embed")) {
    mapSrc = contact.map_link;
  }
  // If only address, fallback
  else if (contact.address) {
    mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
      contact.address
    )}&output=embed`;
  }
  // else fallback to null

  return (
    <div className="Contact-Map-Section">
      <div className="p-5 max-w-screen-xl mx-auto">
        {mapSrc ? (
          <iframe
            className="w-full"
            src={mapSrc}
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        ) : contact.map_link &&
          contact.map_link.startsWith("https://maps.app.goo.gl/") ? (
          <a
            href={contact.map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Google Maps
          </a>
        ) : (
          <div>Map not available</div>
        )}
      </div>
    </div>
  );
};
