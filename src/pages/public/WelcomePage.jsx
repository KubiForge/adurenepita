import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, AlertTriangle, Shield, Eye, Lock } from 'lucide-react';
import heroBg from '../../assets/hero-bg.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: ArrowRight,
      title: 'Continue as Guest',
      desc: 'Browse educational resources, search for support services, and explore awareness campaigns — no account needed.',
      action: () => navigate('/drugs'),
      style: {
        border: '1.5px solid rgba(216,190,130,0.3)',
        background: 'rgba(36,36,38,0.9)',
      },
      iconBg: 'rgba(216,190,130,0.12)',
      iconColor: '#D8BE82',
      badgeText: 'Anonymous',
      badgeColor: 'rgba(216,190,130,0.15)',
      badgeTextColor: '#D8BE82',
    },
    {
      icon: UserPlus,
      title: 'Create an Account',
      desc: 'Save your progress, get personalised resources, and track your recovery journey in a secure private space.',
      action: () => navigate('/register'),
      style: {
        border: '1.5px solid rgba(216,190,130,0.5)',
        background: 'linear-gradient(135deg, rgba(216,190,130,0.08), rgba(36,36,38,0.95))',
      },
      iconBg: 'rgba(216,190,130,0.15)',
      iconColor: '#D8BE82',
      badgeText: 'Recommended',
      badgeColor: 'rgba(216,190,130,0.2)',
      badgeTextColor: '#D8BE82',
    },
    {
      icon: AlertTriangle,
      title: 'I Need Immediate Help',
      desc: 'If you or someone you know is in crisis right now, get connected to emergency support immediately.',
      action: () => window.location.href = 'tel:1926',
      style: {
        border: '1.5px solid rgba(220,50,50,0.4)',
        background: 'rgba(40,16,16,0.95)',
      },
      iconBg: 'rgba(220,50,50,0.15)',
      iconColor: '#f87171',
      badgeText: 'Emergency',
      badgeColor: 'rgba(220,50,50,0.15)',
      badgeTextColor: '#f87171',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#101113',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'fixed', inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'linear-gradient(135deg, rgba(16,17,19,0.93), rgba(16,17,19,0.88))',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 900 }}>
        {/* Back to home */}
        <div style={{ marginBottom: 36 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.5)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(216,190,130,0.08)', border: '1px solid rgba(216,190,130,0.2)',
            borderRadius: 999, padding: '5px 18px', marginBottom: 24,
            color: '#D8BE82', fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
          }}>
            <Shield size={12} /> Confidential & Secure
          </div>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(32px, 6vw, 58px)',
            fontWeight: 300, letterSpacing: 3,
            color: '#F5F2EB', margin: '0 0 12px', lineHeight: 1.1,
          }}>
            Welcome to <span style={{ color: '#D8BE82' }}>BEYOND THE DARKNESS</span>
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(245,242,235,0.6)',
            maxWidth: 500, margin: '0 auto', lineHeight: 1.7,
          }}>
            How would you like to begin your journey today?
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20, marginBottom: 52,
        }}>
          {cards.map(({ icon: Icon, title, desc, action, style, iconBg, iconColor, badgeText, badgeColor, badgeTextColor }) => (
            <button
              key={title}
              onClick={action}
              style={{
                ...style,
                borderRadius: 16, padding: '32px 28px',
                cursor: 'pointer', textAlign: 'left',
                transition: 'transform 0.15s, border-color 0.15s',
                display: 'flex', flexDirection: 'column', gap: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 13,
                  background: iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} color={iconColor} />
                </div>
                <span style={{
                  background: badgeColor, color: badgeTextColor,
                  fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                  padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase',
                }}>{badgeText}</span>
              </div>
              <h3 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 22, fontWeight: 500, color: '#F5F2EB', margin: '0 0 10px',
              }}>{title}</h3>
              <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </button>
          ))}
        </div>

        {/* Privacy section */}
        <div style={{
          background: 'rgba(36,36,38,0.6)',
          border: '1px solid rgba(216,190,130,0.1)',
          borderRadius: 14, padding: '28px 32px',
        }}>
          <h4 style={{ color: '#D8BE82', fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={14} /> Your Privacy is Protected
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: Eye, text: 'All visits are anonymous by default. We do not track your identity.' },
              { icon: Shield, text: 'Your data is encrypted and never shared with third parties.' },
              { icon: Lock, text: 'You may delete your account and all associated data at any time.' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Icon size={16} color="#D8BE82" style={{ marginTop: 2, flexShrink: 0 }} />
                <p style={{ color: 'rgba(245,242,235,0.6)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sign in link */}
        <p style={{ textAlign: 'center', marginTop: 28, color: 'rgba(245,242,235,0.4)', fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: '#D8BE82', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
