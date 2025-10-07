import MarkdownConverter from "@/components/markdown-converter"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Markdown Converter</h1>
          </div>
        </div>
      </header>

      <main className="p-2">
        <MarkdownConverter />
      </main>
    </div>
  )
}
