// components/site-footer.tsx
export default function SiteFooter() {
  return (
        <footer className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-300">
          © {new Date().getFullYear()} Mujtaba Malik. Built with Next.js & shadcn/ui.
        </footer>
  )
}
