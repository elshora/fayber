"use client";
import { useRouter, usePathname } from "next/navigation";
import { Trans } from "react-i18next/TransWithoutContext";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n";
import type { TFunction } from "i18next";
import { Button } from "@/components/ui/button";

const supportedLanguages = ["en", "ar"];

export default function LanguageToggle({ lng }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [t, setT] = useState<TFunction | null>(null);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = await useTranslation(lng);
      setT(() => t);
    })();
  }, [lng]);

  const toggleLanguage = (newLng: string) => {
    const segments = pathname.split("/");

    // Ensure the language prefix is correctly handled
    if (supportedLanguages.includes(segments[1])) {
      segments[1] = newLng;
    } else {
      segments.unshift(newLng);
    }

    const newPath = segments.join("/");
    router.push(newPath);
  };

  if (!t) {
    return null; // Optionally render a loading state or return null
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => toggleLanguage(lng === "en" ? "ar" : "en")}
        className="flex items-center p-2 space-x-2"
      >
        <Trans i18nKey="languageSwitcher" t={t}>
          <strong>{lng === "en" ? "AR" : "EN"}</strong>
        </Trans>
      </Button>
    </>
  );
}
