"use client";

import { useEffect, useState, useRef } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const fallbackLng = "en";
export const languages = [fallbackLng, "ar"];
export const defaultNS = "translation";
export const cookieName = "i18next";
const runsOnServerSide = typeof window === "undefined";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    ns,
  };
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language, namespace) =>
      import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(lng, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const { i18n, ...ret } = useTranslationOrg(ns, options);

  const activeLng = useRef(i18n.resolvedLanguage);

  useEffect(() => {
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    } else {
      if (activeLng.current !== i18n.resolvedLanguage) {
        activeLng.current = i18n.resolvedLanguage;
      }

      if (lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng);
      }

      if (cookies.i18next !== lng) {
        setCookie(cookieName, lng, { path: "/" });
      }
    }
  }, [lng]);

  return { ...ret, i18n };
}
