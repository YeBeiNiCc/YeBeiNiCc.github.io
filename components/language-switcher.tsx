import { setLocale } from "@/app/actions";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <form action={setLocale.bind(null, "zh")}>
        <button
          type="submit"
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${
            current === "zh"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          中文
        </button>
      </form>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <form action={setLocale.bind(null, "en")}>
        <button
          type="submit"
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${
            current === "en"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          EN
        </button>
      </form>
    </div>
  );
}
