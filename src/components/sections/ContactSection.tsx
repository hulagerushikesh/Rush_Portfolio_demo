'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { useState } from 'react';
import { Mail, MapPin, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import { submitContactMessage } from '@/app/actions/messages';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

const contactInfo = [
  { Icon: Mail, label: 'Email', value: 'hulagerushikesh@gmail.com', href: 'mailto:hulagerushikesh@gmail.com' },
  { Icon: MapPin, label: 'Location', value: 'Pune, Maharashtra, India', href: null },
  { Icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/rushikesh-hulage', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/' },
  { Icon: GithubIcon, label: 'GitHub', value: 'github.com/hulagerushikesh', href: 'https://github.com/hulagerushikesh' },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    const result = await submitContactMessage(data);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact">
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let&apos;s <GradientText>connect</GradientText>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, a question, or just want to say hello? I&apos;d love to hear from you.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            marginTop: '48px',
          }}
          className="md-grid-2"
        >
          {/* Contact Info */}
          <AnimatedSection delay={0.2} variant="fadeLeft">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <info.Icon size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '2px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--text-primary)',
                          fontSize: '0.95rem',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.3} variant="fadeRight">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card"
              style={{
                padding: '32px',
              }}
            >
              {submitted && (
                <div
                  style={{
                    padding: '14px 20px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--accent-success)',
                    fontSize: '0.9rem',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle2 size={18} strokeWidth={1.75} />
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {submitError && (
                <div
                  style={{
                    padding: '14px 20px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: '#f87171',
                    fontSize: '0.9rem',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  {submitError}
                </div>
              )}

              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    {...register('name')}
                  />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    {...register('email')}
                  />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="form-input"
                    placeholder="What's this about?"
                    {...register('subject')}
                  />
                  {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-input"
                    placeholder="Your message..."
                    rows={5}
                    style={{ resize: 'vertical' }}
                    {...register('message')}
                  />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message →'}</span>
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>

      {/* Responsive grid helper - injected via style tag */}
      <style jsx>{`
        @media (min-width: 768px) {
          .md-grid-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
