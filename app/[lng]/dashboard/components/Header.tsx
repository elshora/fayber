"use client";
import ToggleSidebar from "./ToggleSidebar";
import ModeToggle from "./ToggleDarkMode";
import { AvatarDemo } from "./Avatar";
import LanguageToggle from "./LanguageToggle";
const Header = ({ lng }: any) => {
  return (
    <header
      className="flex items-center justify-between p-4 gap-3 bg-card shadow-md"
      style={{ height: 88 }}
    >
      {/* Navigation Toggle */}
      <div>
        <ToggleSidebar />
      </div>
      <div className="flex flex-row gap-3 flex-wrap items-center">
        <LanguageToggle lng={lng} />
        <ModeToggle lng={lng} />
        <AvatarDemo />
      </div>
    </header>
  );
};

export default Header;
