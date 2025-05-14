import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={2} />
            )}
            <a
              href={item.href}
              className={`ml-1 ${
                item.current
                  ? "font-medium text-gray-900"
                  : "hover:text-gray-700 hover:underline"
              }`}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
