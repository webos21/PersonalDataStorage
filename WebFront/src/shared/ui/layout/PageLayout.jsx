/**
 * Standard page layout wrapper for CRUD list pages.
 * Provides consistent padding, background, and flex column layout.
 */
export default function PageLayout({ children }) {
    return (
        <div className="h-full flex flex-col p-6 overflow-auto bg-zinc-50/50">
            {children}
        </div>
    )
}
