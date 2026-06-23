interface StackItem  { name: string; sub: string }
interface StackLayer { zone: 'Frontend' | 'Backend' | 'AI'; color: string; border: string; label: string; items: StackItem[] }
interface FlowStep   { step: string; desc: string }

const STACK_LAYERS: StackLayer[] = [
  {
    zone: 'Frontend', color: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', label: '#818cf8',
    items: [
      { name: 'Next.js 15',  sub: 'App Router + RSC' },
      { name: 'EPUB.js',     sub: 'In-browser renderer' },
      { name: 'Zustand',     sub: 'Client state' },
      { name: 'TypeScript',  sub: 'End-to-end types' },
    ],
  },
  {
    zone: 'Backend', color: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', label: '#34d399',
    items: [
      { name: 'FastAPI',    sub: 'REST + SSE streaming' },
      { name: 'PostgreSQL', sub: 'Books & highlights' },
      { name: 'Qdrant',     sub: 'Vector store (RAG)' },
      { name: 'LangChain',  sub: 'Chunking pipeline' },
    ],
  },
  {
    zone: 'AI', color: 'rgba(124,111,245,0.08)', border: 'rgba(124,111,245,0.2)', label: '#a78bfa',
    items: [
      { name: 'OpenRouter',   sub: 'Model gateway' },
      { name: 'Claude 3.5',   sub: 'Explanation & chat' },
      { name: 'Embeddings',   sub: 'text-embedding-3' },
      { name: 'RAG pipeline', sub: 'Semantic retrieval' },
    ],
  },
]

const FLOW_STEPS: FlowStep[] = [
  { step: 'Upload',    desc: 'EPUB → parsed → chunked → embedded → stored in Qdrant' },
  { step: 'Highlight', desc: 'Selected text + surrounding context sent to AI' },
  { step: 'Retrieve',  desc: 'Query vector DB → top-k relevant passages fetched' },
  { step: 'Generate',  desc: 'LLM explains with grounded context, streamed to browser' },
]

function StackCard({ layer }: { layer: StackLayer }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: layer.color, border: `1px solid ${layer.border}` }}>
      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: layer.label }}>
        {layer.zone}
      </span>
      <ul className="mt-4 space-y-3">
        {layer.items.map((item) => (
          <li key={item.name} className="flex items-start gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>{item.name}</p>
              <p className="text-xs mt-0.5"        style={{ color: 'rgba(255,255,255,0.35)' }}>{item.sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-xl">
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.7)' }}>
            Architecture
          </span>
          <h2 className="mt-2 font-extrabold text-white tracking-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            Full-stack, built to production standards.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Every layer is chosen for a specific job — no bloat, no magic black boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {STACK_LAYERS.map((layer) => (
            <StackCard key={layer.zone} layer={layer} />
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Data flow</span>
            <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FLOW_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span
                className="absolute -top-3 left-5 text-[10px] font-bold tracking-widest px-2"
                style={{ color: 'rgba(255,255,255,0.2)', background: '#0a0a0f' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-bold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>{step.step}</p>
              <p className="text-xs leading-relaxed"  style={{ color: 'rgba(255,255,255,0.35)' }}>{step.desc}</p>
              {index < FLOW_STEPS.length - 1 && (
                <span className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'rgba(255,255,255,0.15)' }} aria-hidden>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}