import { cookies } from "next/headers";

export type Locale = "en" | "zh";

const dictionaries = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.admin": "Admin",

    // Home
    "hero.subtitle": "A personal blog about technology and life",
    "section.recentPosts": "Recent Posts",
    "posts.empty": "No posts yet.",
    "posts.writeFirst": "Write your first post →",

    // Post list
    "page.allPosts": "All Posts",

    // Post detail
    "post.backToHome": "← Back to Home",

    // About
    "about.placeholder": "About page content coming soon. Edit it in the ",
    "about.placeholderLink": "admin panel",

    // Footer
    "footer.copyright": "All rights reserved.",
  },
  zh: {
    // Header
    "nav.home": "首页",
    "nav.about": "关于",
    "nav.admin": "管理",

    // Home
    "hero.subtitle": "关于技术和生活的个人博客",
    "section.recentPosts": "最新文章",
    "posts.empty": "还没有文章。",
    "posts.writeFirst": "写第一篇 →",

    // Post list
    "page.allPosts": "全部文章",

    // Post detail
    "post.backToHome": "← 返回首页",

    // About
    "about.placeholder": "关于页面内容即将上线。在",
    "about.placeholderLink": "后台管理",
    "about.placeholderEnd": "中编辑。",

    // Footer
    "footer.copyright": "版权所有。",
  },
};

export async function getTranslations() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value || "en") as Locale;
  const dict = dictionaries[locale] || dictionaries.en;

  return {
    locale,
    t: (key: string) => dict[key as keyof typeof dict] || key,
  };
}

export function getLocaleFromCookie(cookieValue?: string): Locale {
  if (cookieValue === "zh") return "zh";
  return "en";
}
