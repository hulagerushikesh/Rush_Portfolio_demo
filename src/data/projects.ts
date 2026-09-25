import type { Project } from '@/types/content';

// Static portfolio projects. These render when the Firestore CMS is empty or
// unconfigured (e.g. production before Firebase is provisioned), so the public
// site always shows real work. If the CMS has published projects, those win —
// see getPublishedProjects() in src/lib/content.ts.
const now = '2026-09-25T00:00:00.000Z';

export const staticProjects: Project[] = [
  {
    id: 'static-atlas',
    slug: 'atlas',
    title: 'Atlas — Agentic RAG Platform',
    description:
      'Multi-tenant LLM platform with namespace-isolated corpora, a 5-stage agentic retrieval pipeline, and full cost/telemetry instrumentation. Live on GCP.',
    content: [
      '## Atlas',
      '',
      'A multi-tenant agentic RAG platform built in async Python (~6,100 LOC), deployed on Google Cloud Run.',
      '',
      '- **Multi-tenancy & security** — namespace-isolated corpora, SHA-hashed API-key auth, per-key rate limiting, token-level cost attribution, and Prometheus telemetry.',
      '- **Agentic retrieval** — a 5-stage pipeline fusing dense vector search over Qdrant with BM25 via Reciprocal Rank Fusion and cross-encoder reranking, plus an evaluation harness that A/B-tests pipeline changes.',
      '- **Idempotent ingestion** — content fingerprinting skips unchanged chunks, keeping the vector index stable across re-indexing.',
      '',
      'Runs Gemini via an OpenAI-compatible base URL, with Qdrant Cloud for vectors and Firestore for keys and spend tracking.',
    ].join('\n'),
    image_url: null,
    technologies: ['Python', 'FastAPI', 'Qdrant', 'Gemini', 'Cloud Run', 'Docker'],
    status: 'active',
    featured: true,
    github_url: null,
    live_url: 'https://atlas.hulage.in',
    project_date: '2026-09-01',
    published: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'static-visiontrack',
    slug: 'visiontrack',
    title: 'VisionTrack — Real-Time Multi-Object Tracker & SDK',
    description:
      'A real-time multi-object tracking engine built from first principles — Kalman filter, Hungarian assignment, and ByteTrack association — shipped as a published PyPI SDK.',
    content: [
      '## VisionTrack',
      '',
      'A real-time multi-object tracker implemented from scratch, with no third-party tracking libraries.',
      '',
      '- **From first principles** — 8-state Kalman filter, an O(n³) Hungarian assignment solver, and ByteTrack association driven by a track-lifecycle state machine.',
      '- **Production-grade** — per-frame hot path optimized for ~1.5× throughput, shipped as a published PyPI SDK (`visiontrack-mot`) with a stable public API, 344 automated tests, and CI across Python 3.10–3.12.',
      '- **Live demo** — an in-browser, on-device webcam tracker (the core algorithm ported to JS) plus teaching, benchmark, and video routes.',
    ].join('\n'),
    image_url: null,
    technologies: ['Python', 'NumPy', 'ONNX', 'Kalman Filter', 'ByteTrack', 'PyPI'],
    status: 'active',
    featured: true,
    github_url: 'https://github.com/hulagerushikesh/visiontrack',
    live_url: 'https://visiontrack.hulage.in',
    project_date: '2026-08-01',
    published: true,
    sort_order: 2,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'static-finertia',
    slug: 'finertia',
    title: 'Finertia — Momentum Backtesting SaaS',
    description:
      'A momentum-strategy backtesting platform with a pure pandas/numpy engine (no backtesting libraries), a React front end, and a cost-capped Cloud Run backend. Live.',
    content: [
      '## Finertia',
      '',
      'A quantitative backtesting SaaS for momentum strategies.',
      '',
      '- **Engine** — backtesting built entirely on pandas/numpy, deliberately without off-the-shelf backtesting libraries, for full control over the mechanics.',
      '- **Stack** — FastAPI + React + Firebase, deployed on Vercel with a same-origin proxy to a cost-capped Cloud Run backend.',
      '- **Product** — clean strategy configuration, run history, and result visualization.',
    ].join('\n'),
    image_url: null,
    technologies: ['FastAPI', 'React', 'Firebase', 'pandas', 'NumPy', 'Cloud Run'],
    status: 'active',
    featured: true,
    github_url: null,
    live_url: 'https://finertia.hulage.in',
    project_date: '2026-09-15',
    published: true,
    sort_order: 3,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'static-sextant',
    slug: 'sextant',
    title: 'Sextant — MCP-Native RAG',
    description:
      'An MCP-native retrieval-augmented generation system with cost-aware experiments, table-aware chunking, and query decomposition. Open source (MIT).',
    content: [
      '## Sextant',
      '',
      'A ground-up, MCP-native RAG system focused on retrieval quality under a strict cost budget.',
      '',
      '- **MCP-native** — exposes retrieval as Model Context Protocol tools, so any MCP client can query the knowledge base.',
      '- **Retrieval research** — table-aware chunking and a decomposition prompt shipped after a series of cost-controlled experiments; per-document caps and re-ingest-as-replacement semantics keep the index correct.',
      '- **Open source** — public on GitHub under the MIT license.',
    ].join('\n'),
    image_url: null,
    technologies: ['Python', 'MCP', 'Qdrant', 'Gemini', 'RAG'],
    status: 'active',
    featured: false,
    github_url: 'https://github.com/hulagerushikesh/sextant',
    live_url: null,
    project_date: '2026-09-20',
    published: true,
    sort_order: 4,
    created_at: now,
    updated_at: now,
  },
];

export function getStaticProjectBySlug(slug: string): Project | null {
  return staticProjects.find((p) => p.slug === slug) ?? null;
}
