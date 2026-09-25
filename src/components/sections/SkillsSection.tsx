'use client';

import { motion, type Variants } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { DURATION, EASE_STANDARD } from '@/lib/motion';
import { getResumeData } from '@/utils/data';

// Chips within a row trickle in rather than appearing all at once.
const tagListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_STANDARD },
  },
};

const skillLabels: Record<string, { label: string; sub: string }> = {
  languages: { label: 'Languages', sub: 'LANG' },
  identity: { label: 'Identity & Access', sub: 'IAM' },
  security: { label: 'Security', sub: 'SEC' },
  backend: { label: 'Backend', sub: 'API' },
  cloud: { label: 'Cloud / DevOps', sub: 'INFRA' },
  aiMl: { label: 'AI / ML', sub: 'MODELS' },
  frameworks: { label: 'Frameworks', sub: 'LIBS' },
};

export default function SkillsSection() {
  const resume = getResumeData();
  const skillCategories = Object.entries(resume.skills);

  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container section-grid">
        <aside className="section-rail">
          <span className="rail-idx">03</span>
          <span className="rail-k">Tooling</span>
          <span className="rail-k">Spec</span>
        </aside>

        <div>
          <AnimatedSection>
            <span className="section-label">Stack</span>
            <h2 className="section-title">The instruments I reach for</h2>
            <p className="section-subtitle">
              Tools I rely on daily to design, build, and ship production systems — by domain.
            </p>
          </AnimatedSection>

          <div style={{ marginTop: '40px' }}>
            {skillCategories.map(([key, skills], i) => {
              const meta = skillLabels[key] ?? { label: key, sub: '' };
              return (
                <AnimatedSection key={key} delay={0.08 * i} variant="blurIn">
                  <div className="spec-row">
                    <div className="spec-k">
                      {meta.label}
                      <span>{meta.sub}</span>
                    </div>
                    <motion.div
                      className="spec-v"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      variants={tagListVariants}
                    >
                      {skills.map((skill) => (
                        <motion.span key={skill} className="tech-tag" variants={tagVariants}>
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
