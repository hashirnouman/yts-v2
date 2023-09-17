import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getLocale } from "../sanity/sanity-utils";

// Define a type for the context state
interface LocaleContextState {
  locale: string;
  setLocale: (locale: string) => void;
  t: (text: string) => string;
}

// Create a context for the locale
const LocaleContext = createContext<LocaleContextState | undefined>(undefined);

// Create a custom hook to access the locale context

// Create a provider component
interface ILocaleProvider {
  children: ReactNode;
}
interface ITranslations {
  key: string;
  value: string;
}
export const LocaleProvider = ({ children }: ILocaleProvider) => {
  const [locale, setLocale] = useState<string>("en");
  const [translations, setTranslations] = useState<ITranslations[]>([]);

  const getTranslation = async () => {
    const res = await getLocale({
      lang: locale,
    });
    setTranslations(res);
  };
  useEffect(() => {
    getTranslation();
  }, [locale]);
  const t = (text: string): string => {
    const translationObj = translations.find((item) => item.key === text);

    // If a matching translation is found, return its value; otherwise, return the original text
    return translationObj ? translationObj?.value : "";
  };
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
