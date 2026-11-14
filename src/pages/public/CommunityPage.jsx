import { useState } from 'react';
import {
  Heart, Users, Megaphone, BookOpen, School, Calendar,
  HandHeart, Send, CheckCircle, ChevronRight, Star,
  Globe, Shield, Mic
} from 'lucide-react';

const volunteerOpportunities = [
  {
    icon: School,
    title: 'School Outreach Programs',
    description: 'Join our teams visiting schools across Sri Lanka to deliver age-appropriate drug prevention education.',
    commitment: '4–8 hrs/month',
    locations: 'Western, Central, Southern Provinces',
  },
  {
    icon: Megaphone,
    title: 'Community Awareness Events',
    description: 'Help organize and facilitate public awareness campaigns, workshops, and community gatherings.',
    commitment: '1–2 events/month',
    locations: 'Island-wide',
  },
  {
    icon: HandHeart,
    title: 'Peer Support Facilitation',
    description: 'Trained volunteers who have personal experience with recovery journey supporting others through facilitated group discussions.',
    commitment: '2–4 hrs/week',
    locations: 'Colombo, Kandy, Galle',
  },
  {
    icon: Globe,
    title: 'English Educational Content & Media',
    description: 'Help us make clear, accessible English-language resources for everyone in the community.',
    commitment: 'Flexible, remote',
    locations: 'Remote/Island-wide',
  },
  {
    icon: BookOpen,
    title: 'Content Creation & Storytelling',
    description: 'Writers, designers, and media professionals who can help create powerful educational and awareness content.',
    commitment: 'Flexible',
    locations: 'Remote',
  },
  {
    icon: Shield,
    title: 'Helpline Support (Trained)',
    description: 'After completing our volunteer training program, support individuals seeking guidance through our text-based helpline.',
    commitment: '3–6 hrs/week',
    locations: 'Remote (online)',
  },
];

const participationCards = [
  {
    icon: Users,
    title: 'Volunteer With Us',
    subtitle: 'Give Your Time',
    description: 'Join a network of passionate volunteers across Sri Lanka working to prevent drug abuse and support recovery.',
    action: 'Apply to Volunteer',
    color: '#D8BE82',
    anchor: '#volunteer-form',
  },
  {
    icon: Mic,
    title: 'Share Your Story',
    subtitle: 'Anonymously',
    description: 'Your lived experience can inspire and guide others. Share anonymously — your identity is always protected.',
    action: 'Share Anonymously',
    color: '#a78fd4',
    anchor: '#volunteer-form',
  },
  {
    icon: Megaphone,
    title: 'Join a Campaign',
    subtitle: 'Raise Awareness',
    description: 'Participate in our upcoming awareness campaigns, school programs, and community events near you.',
    action: 'See Campaigns',
    color: '#7ec8b4',
    anchor: '/awareness',
  },
];

const interestAreas = [
  'School Outreach',
  'Community Events',
  'Peer Support',
  'English Educational Content',
  'Content & Media',
  'Helpline Support',
  'Fundraising',
  'Other',
];

export default function CommunityPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: 'var(--midnight)', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0b0d 0%, #1a1b1e 50%, #0d0e10 100%)',
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(216,190,130,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '5%', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,190,130,0.06) 0%, transparent 70%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(216,190,130,0.1)', border: '1px solid rgba(216,190,130,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 28,
            }}>
              <Heart size={14} color="var(--gold)" />
              <span style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em' }}>
                COMMUNITY & VOLUNTEERING
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: 'var(--ivory)', lineHeight: 1.15, marginBottom: 24,
            }}>
              Be Part of a{' '}
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Positive Change</span>
            </h1>

            <p style={{ color: 'var(--ivory-dim)', fontSize: '1.15rem', maxWidth: 580, lineHeight: 1.75, marginBottom: 36 }}>
              Every person who steps forward to volunteer, share, or advocate becomes a beacon of hope for someone
              walking through the darkness. Together, we build a Sri Lanka free from the chains of drug dependency.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#participate" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                Get Involved <ChevronRight size={16} />
              </a>
              <a href="#volunteer-form" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                Register Interest
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--midnight))',
        }} />
      </section>

      {/* ── 3 Participation Cards ─────────────────────────── */}
      <section id="participate" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: 'var(--ivory)', marginBottom: 12,
            }}>
              How Would You Like to Help?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
              There's a place for everyone in this mission. Choose how you'd like to contribute.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
          }}>
            {participationCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="card" style={{
                  padding: 36,
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: `3px solid ${card.color}`,
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: 20,
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: `${card.color}18`,
                    border: `1px solid ${card.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={28} color={card.color} />
                  </div>

                  <div>
                    <div style={{ color: card.color, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 6 }}>
                      {card.subtitle}
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)', fontSize: '1.5rem',
                      color: 'var(--ivory)', marginBottom: 12,
                    }}>
                      {card.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                      {card.description}
                    </p>
                  </div>

                  <a
                    href={card.anchor}
                    style={{
                      marginTop: 'auto',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      color: card.color, fontSize: '0.9rem', fontWeight: 600,
                      transition: 'gap 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                    onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                  >
                    {card.action} <ChevronRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Volunteer Opportunities ───────────────────────── */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, var(--midnight) 0%, #0d0e10 100%)',
      }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: 'var(--ivory)', marginBottom: 12,
            }}>
              Volunteer Opportunities
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 580 }}>
              We have a range of ways you can contribute your time and skills.
              All roles include orientation, training, and ongoing support from our team.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {volunteerOpportunities.map((opp) => {
              const Icon = opp.icon;
              return (
                <div key={opp.title} style={{
                  background: 'var(--smoky-2)',
                  border: '1px solid rgba(216,190,130,0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: 28,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  transition: 'border-color 0.25s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(216,190,130,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(216,190,130,0.1)'}
                >
                  <div style={{
                    width: 48, height: 48, minWidth: 48, borderRadius: 12,
                    background: 'rgba(216,190,130,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} color="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)', fontSize: '1.15rem',
                      color: 'var(--ivory)', marginBottom: 8,
                    }}>
                      {opp.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 12 }}>
                      {opp.description}
                    </p>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: 12, color: 'var(--gold)',
                        background: 'rgba(216,190,130,0.08)',
                        padding: '3px 10px', borderRadius: 20,
                        border: '1px solid rgba(216,190,130,0.2)',
                      }}>
                        ⏱ {opp.commitment}
                      </span>
                      <span style={{
                        fontSize: 12, color: 'var(--ivory-dim)',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '3px 10px', borderRadius: 20,
                      }}>
                        📍 {opp.locations}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Info Sections: School & Events ───────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
          }}>
            {/* School outreach */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(216,190,130,0.08) 0%, rgba(216,190,130,0.03) 100%)',
              border: '1px solid rgba(216,190,130,0.2)',
              borderRadius: 'var(--radius-lg)', padding: 40,
            }}>
              <School size={40} color="var(--gold)" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--ivory)', marginBottom: 16 }}>
                School Outreach
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
                Our school programs deliver evidence-based drug prevention education to students from Grade 6 through A/L.
                Trained volunteers facilitate interactive sessions covering the risks of drug use, building resilience,
                and knowing how to seek help.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Interactive English-language workshops', 'Curriculum approved by education specialists', 'Available for government and private schools', 'Includes parent awareness sessions'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <CheckCircle size={16} color="var(--gold)" style={{ minWidth: 16, marginTop: 3 }} />
                    <span style={{ color: 'var(--ivory-dim)', fontSize: '0.9rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Awareness events */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(126,200,180,0.06) 0%, rgba(126,200,180,0.02) 100%)',
              border: '1px solid rgba(126,200,180,0.2)',
              borderRadius: 'var(--radius-lg)', padding: 40,
            }}>
              <Calendar size={40} color="#7ec8b4" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--ivory)', marginBottom: 16 }}>
                Awareness Events
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
                From public forums to social media campaigns, our awareness events bring communities together
                to have honest, stigma-free conversations about drug use and recovery.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Public awareness walks & rallies', 'Community discussion forums', 'Digital campaigns & social media drives', 'Memorial observances (June 26 – IDADD)'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <CheckCircle size={16} color="#7ec8b4" style={{ minWidth: 16, marginTop: 3 }} />
                    <span style={{ color: 'var(--ivory-dim)', fontSize: '0.9rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community support */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(167,143,212,0.06) 0%, rgba(167,143,212,0.02) 100%)',
              border: '1px solid rgba(167,143,212,0.2)',
              borderRadius: 'var(--radius-lg)', padding: 40,
            }}>
              <Heart size={40} color="#a78fd4" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--ivory)', marginBottom: 16 }}>
                Community Support
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
                Supporting individuals and families affected by drug use through peer networks, family guidance sessions,
                and connecting people with professional services.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Family support circles', 'Peer-led recovery support groups', 'Connection to NDDCB & professional services', 'Confidential guidance for concerned families'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <CheckCircle size={16} color="#a78fd4" style={{ minWidth: 16, marginTop: 3 }} />
                    <span style={{ color: 'var(--ivory-dim)', fontSize: '0.9rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration Interest Form ────────────────────── */}
      <section id="volunteer-form" style={{
        padding: '80px 0 120px',
        background: 'linear-gradient(180deg, var(--midnight) 0%, #0d0e10 100%)',
      }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Star size={36} color="var(--gold)" style={{ marginBottom: 16 }} />
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: 'var(--ivory)', marginBottom: 12,
            }}>
              Register Your Interest
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>
              Fill in the form below and our volunteer coordinator will reach out to you within 3–5 working days.
            </p>
          </div>

          {submitted ? (
            <div style={{
              background: 'rgba(126,200,180,0.08)',
              border: '1px solid rgba(126,200,180,0.3)',
              borderRadius: 'var(--radius-lg)', padding: '56px 40px',
              textAlign: 'center',
            }}>
              <CheckCircle size={56} color="#7ec8b4" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--ivory)', marginBottom: 12 }}>
                Thank You for Stepping Forward!
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
                We've received your registration of interest. Our volunteer coordinator will contact you within 3–5 working days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--smoky-2)',
                border: '1px solid rgba(216,190,130,0.15)',
                borderRadius: 'var(--radius-lg)', padding: 48,
                display: 'flex', flexDirection: 'column', gap: 24,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.06em' }}>
                    FULL NAME *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(216,190,130,0.2)', borderRadius: 'var(--radius-sm)',
                      padding: '12px 16px', color: 'var(--ivory)', outline: 'none',
                      fontSize: '0.95rem', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(216,190,130,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(216,190,130,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.06em' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(216,190,130,0.2)', borderRadius: 'var(--radius-sm)',
                      padding: '12px 16px', color: 'var(--ivory)', outline: 'none',
                      fontSize: '0.95rem', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(216,190,130,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(216,190,130,0.2)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.06em' }}>
                  AREA OF INTEREST *
                </label>
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%', background: '#1e1f22',
                    border: '1px solid rgba(216,190,130,0.2)', borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px', color: form.interest ? 'var(--ivory)' : 'var(--text-muted)',
                    outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s',
                    appearance: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(216,190,130,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(216,190,130,0.2)'}
                >
                  <option value="" disabled>Select your area of interest</option>
                  {interestAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: '0.06em' }}>
                  MESSAGE / TELL US MORE (OPTIONAL)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your background, motivation, or any questions you have..."
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(216,190,130,0.2)', borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px', color: 'var(--ivory)', outline: 'none',
                    fontSize: '0.95rem', resize: 'vertical', minHeight: 120,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(216,190,130,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(216,190,130,0.2)'}
                />
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                🔒 Your information is kept confidential and will only be used to contact you about volunteering opportunities.
              </p>

              <button type="submit" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1rem', alignSelf: 'flex-start' }}>
                Submit Registration <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
