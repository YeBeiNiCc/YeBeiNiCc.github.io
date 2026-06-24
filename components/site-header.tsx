import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-end">
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-blue-600 transition-colors">
              首页
            </Link>
            <Link href="/projects" className="text-sm hover:text-blue-600 transition-colors">
              项目
            </Link>
            <Link href="/posts" className="text-sm hover:text-blue-600 transition-colors">
              文章
            </Link>
            <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">
              关于
            </Link>
            <Link href="/keystatic" className="text-sm hover:text-blue-600 transition-colors">
              管理
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
