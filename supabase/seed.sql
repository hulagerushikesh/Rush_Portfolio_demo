-- One-time migration of the previously hardcoded src/data/projects.json into
-- the projects table. Run after schema.sql. Safe to re-run (upserts by slug).

insert into public.projects
  (slug, title, description, image_url, technologies, status, featured, github_url, live_url, project_date, published, sort_order)
values
  ('enterprise-ai-platform',
   'Enterprise Generative AI Platform',
   'Architected and led the end-to-end development of a scalable enterprise search platform using Retrieval-Augmented Generation (RAG) with LLMs on AWS SageMaker, significantly improving information retrieval accuracy.',
   null,
   array['RAG', 'LLMs', 'AWS SageMaker', 'Kubeflow', 'MLflow', 'CI/CD'],
   'coming-soon', true, null, null, '2025', true, 0),

  ('ai-personalization-engine',
   'AI-Powered Personalization Engine',
   'Designed and deployed a high-throughput deep learning recommendation system on GCP Vertex AI, serving millions of users with low latency and driving a significant uplift in user engagement.',
   null,
   array['Deep Learning', 'GCP Vertex AI', 'Recommendation Systems', 'A/B Testing', 'SHAP'],
   'coming-soon', false, null, null, '2024', true, 1),

  ('waf-migration-platform',
   'AWS WAF Security Migration Platform',
   'Led the critical migration from AWS WAF Classic to WAFv2 for all internal applications, architecting integration with CloudFront, S3, and CloudWatch to establish a comprehensive security monitoring system.',
   null,
   array['AWS WAFv2', 'CloudFront', 'CloudWatch', 'Nginx', 'Java', 'Spring Boot'],
   'coming-soon', true, null, null, '2024', true, 2),

  ('nlp-sentiment-pipeline',
   'NLP Sentiment Analysis Pipeline',
   'Built an end-to-end NLP pipeline for real-time sentiment analysis using Hugging Face Transformers, processing large-scale text data with custom fine-tuned models for domain-specific accuracy.',
   null,
   array['Hugging Face', 'PyTorch', 'NLP', 'Docker', 'FastAPI', 'Redis'],
   'coming-soon', false, null, null, '2023', true, 3)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  technologies = excluded.technologies,
  status = excluded.status,
  featured = excluded.featured,
  project_date = excluded.project_date,
  published = excluded.published,
  sort_order = excluded.sort_order;
