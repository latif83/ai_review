"use client";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    setSelectedLang(savedLang);

    // Wait for Google Translate iframe to load
    const interval = setInterval(() => {
      const iframe = document.querySelector(".goog-te-menu-frame");
      if (iframe) {
        clearInterval(interval);
        changeLanguage(savedLang);
      }
    }, 1000);
  }, []);

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem("selectedLanguage", lang);

    const iframe = document.querySelector(".goog-te-menu-frame");
    if (!iframe) {
      console.error("Google Translate iframe not found. Retrying...");
      return;
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const langButtons = iframeDoc.querySelectorAll(".goog-te-menu2-item span.text");

    let found = false;
    langButtons.forEach((btn) => {
      if (btn.innerText.toLowerCase().includes(lang.toLowerCase())) {
        btn.click();
        found = true;
      }
    });

    if (!found) {
      console.error("Language button not found inside Google Translate iframe.");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 ${selectedLang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => changeLanguage("english")}
      >
        🇬🇧 English
      </button>
      <button
        className={`px-3 py-1 ${selectedLang === "fr" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => changeLanguage("french")}
      >
        🇫🇷 Français
      </button>
    </div>
  );
};

export default LanguageSwitcher;
