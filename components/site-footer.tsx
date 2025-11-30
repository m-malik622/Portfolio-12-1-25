// components/site-footer.tsx
export default function SiteFooter() {
  return (
    <footer className="mt-4 border-t pt-4 text-xs text-muted-foreground">
      © {new Date().getFullYear()} Dina Taing. Built with Next.js &amp; shadcn/ui.
    </footer>
  )
}
