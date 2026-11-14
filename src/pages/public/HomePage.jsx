import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Heart, Users, ArrowRight, Phone, Sparkles,
  BookOpen, MapPin, Megaphone, ChevronRight, Star,
  MessageCircle, AlertTriangle, Globe
} from 'lucide-react';
import heroBg from '../../assets/hero-bg.png';
import campaignsBg from '../../assets/campaigns-bg.jpg';

const stats = [
  { label: 'Website Visits', value: '12,480', icon: Globe },
  { label: 'AI Conversations', value: '1,328', icon: MessageCircle },
  { label: 'Support Referrals', value: '276', icon: Heart },
  { label: 'Verified Services', value: '42', icon: Star },
];

const features = [
  {
    icon: Shield,
    title: 'Prevention',
    desc: 'Evidence-based education on substances, risks, and how to protect yourself and your loved ones.',
    link: '/drugs',
    linkText: 'Explore Knowledge',
  },
  {
    icon: Heart,
    title: 'Support',
    desc: 'Confidential guidance and AI-powered assistance available 24/7 — no judgment, no registration required.',
    link: '/assistant',
    linkText: 'Talk to AI Assistant',
  },
  {
    icon: Users,
    title: 'Connect',
    desc: 'Find verified rehabilitation centres, counsellors, and community support services across Sri Lanka.',
    link: '/support',
    linkText: 'Find Services',
  },
];

const previewDrugs = [
  {
    name: 'Cannabis',
    sinhala: 'කංසා',
    category: 'Cannabis',
    desc: 'The most commonly used illicit substance in Sri Lanka. Learn about its effects, risks and support options.',
    slug: 'cannabis',
    color: '#2d4a2d',
  },
  {
    name: 'Methamphetamine',
    sinhala: 'අයිස්',
    category: 'Stimulant',
    desc: 'A highly addictive stimulant. Understand the warning signs and pathways to recovery.',
    slug: 'methamphetamine',
    color: '#3a2a1a',
  },
  {
    name: 'Heroin',
    sinhala: 'හෙරොයින්',
    category: 'Opioid',
    desc: 'A powerful opioid causing severe dependence. Know the risks and emergency response steps.',
    slug: 'heroin',
    color: '#2a1a2a',
  },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: '#101113', color: '#F5F2EB', fontFamily: 'sans-serif' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(16,17,19,0.88) 0%, rgba(16,17,19,0.70) 50%, rgba(16,17,19,0.85) 100%)',
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative', zIndex: 2,
            textAlign: 'center', maxWidth: 820,
            padding: '0 24px',
          }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(216,190,130,0.12)', border: '1px solid rgba(216,190,130,0.3)',
            borderRadius: 999, padding: '6px 20px', marginBottom: 32,
            color: '#D8BE82', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
          }}>
            <Sparkles size={14} />
            Sri Lanka's Drug Prevention & Recovery Platform
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 300, letterSpacing: 6,
            color: '#F5F2EB', margin: '0 0 12px 0', lineHeight: 1.05,
          }}>
            BEYOND THE
            <span style={{ display: 'block', color: '#D8BE82' }}>DARKNESS</span>
          </h1>

          {/* Sinhala tagline */}
          <p style={{
            fontFamily: '"Noto Serif Sinhala", serif',
            fontSize: 'clamp(20px, 3vw, 32px)',
            color: '#D8BE82', marginBottom: 20, letterSpacing: 2,
          }}>
            අඳුරෙන් එළියට
          </p>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(245,242,235,0.75)',
            maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.7,
          }}>
            A safe and confidential space for information, support and recovery
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/welcome" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #D8BE82, #b8993d)',
                color: '#101113', border: 'none', borderRadius: 8,
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                letterSpacing: 0.5, transition: 'all 0.2s',
              }}>
                Start Your Journey <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/assistant" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: '#D8BE82', border: '1.5px solid #D8BE82', borderRadius: 8,
                padding: '14px 32px', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}>
                <MessageCircle size={18} /> Talk to AI Assistant
              </button>
            </Link>
            <Link to="/support" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: 'rgba(245,242,235,0.85)', border: '1.5px solid rgba(245,242,235,0.3)', borderRadius: 8,
                padding: '14px 32px', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}>
                <MapPin size={18} /> Find Professional Support
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(245,242,235,0.4)', fontSize: 12, letterSpacing: 2,
        }}>
          <span>SCROLL</span>
          <div style={{
            width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(216,190,130,0.6), transparent)',
          }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        background: '#0a0b0d',
        borderTop: '1px solid rgba(216,190,130,0.15)',
        borderBottom: '1px solid rgba(216,190,130,0.15)',
        padding: '28px 24px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32, textAlign: 'center',
        }}>
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
                <Icon size={18} color="#D8BE82" />
                <span style={{ fontSize: 28, fontWeight: 700, color: '#D8BE82', fontFamily: '"Cormorant Garamond", serif' }}>
                  {value}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(245,242,235,0.55)', letterSpacing: 1, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '96px 24px', background: '#101113' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{
              fontSize: 12, letterSpacing: 3, color: '#D8BE82',
              textTransform: 'uppercase', display: 'block', marginBottom: 16,
            }}>How We Help</span>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300,
              color: '#F5F2EB', margin: 0,
            }}>
              Your Path to Recovery Starts Here
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {features.map(({ icon: Icon, title, desc, link, linkText }) => (
              <div key={title} style={{
                background: '#242426', borderRadius: 16,
                border: '1px solid rgba(216,190,130,0.1)',
                padding: 36, transition: 'border-color 0.2s',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'rgba(216,190,130,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                }}>
                  <Icon size={26} color="#D8BE82" />
                </div>
                <h3 style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 26, fontWeight: 500, color: '#F5F2EB', margin: '0 0 12px',
                }}>{title}</h3>
                <p style={{ color: 'rgba(245,242,235,0.65)', lineHeight: 1.7, margin: '0 0 28px', fontSize: 15 }}>{desc}</p>
                <Link to={link} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D8BE82', fontWeight: 600, fontSize: 14 }}>
                  {linkText} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRUG KNOWLEDGE PREVIEW ── */}
      <section style={{ padding: '80px 24px', background: '#0d0e10' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 12, letterSpacing: 3, color: '#D8BE82', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
                Educational Resources
              </span>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: '#F5F2EB', margin: 0,
              }}>Know About Substances</h2>
            </div>
            <Link to="/drugs" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#D8BE82', fontWeight: 600, fontSize: 14, border: '1px solid rgba(216,190,130,0.3)', padding: '10px 24px', borderRadius: 8 }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {previewDrugs.map((drug) => (
              <div key={drug.slug} style={{
                background: '#242426', borderRadius: 14,
                border: '1px solid rgba(216,190,130,0.08)',
                overflow: 'hidden', transition: 'transform 0.2s',
              }}>
                {/* Card color header */}
                <div style={{
                  height: 90, background: drug.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BookOpen size={36} color="rgba(216,190,130,0.7)" />
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{
                      background: 'rgba(216,190,130,0.12)', color: '#D8BE82',
                      fontSize: 11, fontWeight: 700, letterSpacing: 1,
                      padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase',
                    }}>{drug.category}</span>
                  </div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, fontWeight: 500, color: '#F5F2EB', margin: '0 0 4px' }}>{drug.name}</h3>
                  <p style={{ color: '#D8BE82', fontSize: 13, margin: '0 0 14px', fontFamily: '"Noto Serif Sinhala", serif' }}>{drug.sinhala}</p>
                  <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 14, lineHeight: 1.65, margin: '0 0 20px' }}>{drug.desc}</p>
                  <Link to={`/drugs/${drug.slug}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D8BE82', fontWeight: 600, fontSize: 14 }}>
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARENESS SECTION ── */}
      <section style={{ position: 'relative', padding: '100px 24px', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${campaignsBg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,17,19,0.82)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: 12, letterSpacing: 3, color: '#D8BE82', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
            <Megaphone size={14} style={{ display: 'inline', marginRight: 6 }} />
            Campaigns & Awareness
          </span>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 300, color: '#F5F2EB', margin: '0 0 20px' }}>
            Beyond the Stigma Campaign
          </h2>
          <p style={{ color: 'rgba(245,242,235,0.7)', fontSize: 16, lineHeight: 1.75, margin: '0 0 36px' }}>
            Join Sri Lanka's largest drug prevention awareness campaign. Running November 15–30, 2026 across schools, universities and communities island-wide.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/awareness" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #D8BE82, #b8993d)',
                color: '#101113', border: 'none', borderRadius: 8,
                padding: '13px 30px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}>
                View Campaigns
              </button>
            </Link>
            <Link to="/awareness" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent', color: '#F5F2EB',
                border: '1.5px solid rgba(245,242,235,0.35)', borderRadius: 8,
                padding: '13px 30px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}>
                Register as Volunteer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY QUICK ACCESS ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a0a0a, #2a0d0d)',
        borderTop: '1px solid rgba(220,50,50,0.2)',
        borderBottom: '1px solid rgba(220,50,50,0.2)',
        padding: '40px 24px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(220,50,50,0.15)', border: '2px solid rgba(220,50,50,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AlertTriangle size={24} color="#f87171" />
            </div>
            <div>
              <p style={{ margin: 0, color: '#f87171', fontWeight: 700, fontSize: 16, letterSpacing: 0.5 }}>
                Need Immediate Help?
              </p>
              <p style={{ margin: '4px 0 0', color: 'rgba(245,242,235,0.6)', fontSize: 14 }}>
                NDDCB National Hotline — Free, Confidential, 24/7
              </p>
            </div>
          </div>
          <a href="tel:1926" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#dc2626', color: '#fff', border: 'none', borderRadius: 10,
              padding: '14px 36px', fontSize: 22, fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              letterSpacing: 2,
            }}>
              <Phone size={22} /> Call 1926
            </button>
          </a>
        </div>
      </section>

      {/* ── FOOTER TRANSITION ── */}
      <div style={{
        height: 120,
        background: 'linear-gradient(to bottom, #101113, #0a0b0d)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 1, height: 80,
          background: 'linear-gradient(to bottom, rgba(216,190,130,0.4), transparent)',
        }} />
      </div>
    </div>
  );
}
