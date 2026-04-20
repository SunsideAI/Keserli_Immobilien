"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem("cookie_consent");
        window.location.reload();
      }}
      className="hover:text-white transition-colors"
    >
      Cookie-Einstellungen
    </button>
  );
}
