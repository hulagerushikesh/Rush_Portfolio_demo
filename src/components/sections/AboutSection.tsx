import AnimatedSection from '@/components/ui/AnimatedSection';

export default function AboutSection() {
  return (
    <section id="about">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">About</span>
            <h2 className="section-title">About <em>me</em></h2>
          </div>
        </AnimatedSection>

        <div className="section-body">
          <AnimatedSection delay={0.15}>
            <p className="about-text">
              I&apos;m a backend engineer in Pune. At work I look after the parts people only
              notice when they break: sign-in, certificates and migrations. Outside work I build
              AI systems and run them myself, which means paying the bill, watching the numbers
              and publishing the ideas that did not work as well as the ones that did.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
