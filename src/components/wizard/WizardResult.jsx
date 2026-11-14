// WizardResult.jsx — Personalised guidance results page
import React, { useState } from 'react';
import {
  BookOpen, HeartHandshake, MapPin, MessageSquare,
  Phone, ExternalLink, AlertTriangle, ChevronRight,
  FileText, Users, Stethoscope, ArrowRight, Star, Shield,
} from 'lucide-react';

// ── Static resource data ─────────────────────────────────────────────────────

const ARTICLES = {
  recovery: [
    { id: 'r1', title: 'Understanding Addiction: A Compassionate Guide', desc: 'Learn what addiction is, why it happens, and how recovery works.', tag: 'Recovery', readTime: '7 min', icon: <BookOpen size={18} /> },
    { id: 'r2', title: 'Managing Cravings: Practical Techniques', desc: 'Proven strategies to cope with urges without giving in.', tag: 'Coping Skills', readTime: '5 min', icon: <Star size={18} /> },
    { id: 'r3', title: 'What to Expect in a Rehabilitation Programme', desc: 'A step-by-step walkthrough of what rehab looks and feels like.', tag: 'Rehabilitation', readTime: '9 min', icon: <Shield size={18} /> },
  ],
  education: [
    { id: 'e1', title: 'How Drugs Affect the Brain', desc: 'The science of how common substances alter brain chemistry.', tag: 'Education', readTime: '6 min', icon: <BookOpen size={18} /> },
    { id: 'e2', title: 'Myths and Facts About Drug Use', desc: 'Common misconceptions debunked with evidence-based facts.', tag: 'Awareness', readTime: '4 min', icon: <FileText size={18} /> },
    { id: 'e3', title: 'Recognising Early Warning Signs', desc: 'How to spot the signs of problematic use in yourself or others.', tag: 'Prevention', readTime: '5 min', icon: <AlertTriangle size={18} /> },
  ],
  family: [
    { id: 'f1', title: 'Talking to a Loved One About Drug Use', desc: 'How to have difficult conversations with care and empathy.', tag: 'Family', readTime: '8 min', icon: <Users size={18} /> },
    { id: 'f2', title: 'Setting Healthy Boundaries', desc: 'Protect yourself while supporting someone through recovery.', tag: 'Family', readTime: '6 min', icon: <Shield size={18} /> },
    { id: 'f3', title: 'Supporting Without Enabling', desc: 'The difference between helping and enabling harmful behaviour.', tag: 'Family', readTime: '5 min', icon: <HeartHandshake size={18} /> },
  ],
  healthcare: [
    { id: 'h1', title: 'When to Seek Medical Help Immediately', desc: 'Signs that require urgent medical attention during withdrawal.', tag: 'Medical', readTime: '3 min', icon: <Stethoscope size={18} /> },
    { id: 'h2', title: 'Medication-Assisted Treatment (MAT) in Sri Lanka', desc: 'An overview of medical treatment options available locally.', tag: 'Medical', readTime: '7 min', icon: <FileText size={18} /> },
    { id: 'h3', title: 'Mental Health and Substance Use: The Connection', desc: 'How co-occurring conditions are treated together.', tag: 'Health', readTime: '6 min', icon: <BookOpen size={18} /> },
  ],
  services: [
    { id: 's1', title: 'Finding the Right Professional for You', desc: 'A guide to counsellors, psychiatrists, and rehab specialists.', tag: 'Services', readTime: '5 min', icon: <MapPin size={18} /> },
    { id: 's2', title: 'What Happens During a First Counselling Session', desc: 'Remove the anxiety — here is what to expect.', tag: 'Counselling', readTime: '4 min', icon: <MessageSquare size={18} /> },
    { id: 's3', title: 'Free vs Paid Support Services in Sri Lanka', desc: 'Navigate your options based on your circumstances.', tag: 'Services', readTime: '6 min', icon: <FileText size={18} /> },
  ],
};

const SERVICES_BY_PROVINCE = {
  'Western': [
    { name: 'NDDCB Treatment Centre – Colombo', address: 'Sri Jayawardenepura Kotte, Colombo', phone: '0112865000', type: 'Government Rehab', verified: true },
    { name: 'SADIG Counselling Centre', address: 'Dehiwala-Mount Lavinia, Colombo', phone: '0112718000', type: 'Counselling', verified: true },
    { name: 'Sumithrayo Sri Lanka', address: 'No.60, Horton Place, Colombo 7', phone: '0112692909', type: 'Crisis Support', verified: true },
  ],
  'Central': [
    { name: 'Kandy District NDDCB Centre', address: 'Kandy Road, Kandy', phone: '0812222222', type: 'Government Rehab', verified: true },
    { name: 'Community Recovery Centre Kandy', address: 'Peradeniya Road, Kandy', phone: '0812235500', type: 'Counselling', verified: false },
  ],
  'Southern': [
    { name: 'Galle District Hospital – Psychiatry', address: 'Karapitiya, Galle', phone: '0912246259', type: 'Healthcare', verified: true },
    { name: 'Southern NDDCB Outreach', address: 'Galle Town, Galle', phone: '0912234567', type: 'Government Programme', verified: true },
  ],
  'Northern': [
    { name: 'Jaffna Teaching Hospital – Mental Health', address: 'Inuvil, Jaffna', phone: '0212221501', type: 'Healthcare', verified: true },
    { name: 'Jaffna Community Counselling', address: 'Jaffna Town, Jaffna', phone: '0212224000', type: 'Counselling', verified: false },
  ],
  'default': [
    { name: 'NDDCB National Hotline', address: 'Available island-wide', phone: '1926', type: 'Crisis Hotline', verified: true },
    { name: 'Sumithrayo National Helpline', address: 'Island-wide', phone: '0112692909', type: 'Emotional Support', verified: true },
  ],
};

// ── Helper ───────────────────────────────────────────────────────────────────

function getResultConfig(answers) {
  const purpose = answers[1];
  let heading, tagline, articleKey, planPoints, resultType;

  switch (purpose) {
    case 1:
      heading = 'Your Recovery Pathway';
      tagline = 'You have already taken the most important step. Here is a personalised plan to guide you forward.';
      articleKey = 'recovery';
      resultType = 'recovery';
      planPoints = [
        'Review the recommended resources below at your own pace',
        'Connect with a local professional support service',
        'Use the AI Assistant for 24/7 anonymous support',
        'Revisit this plan anytime — your journey is personal',
      ];
      break;
    case 2:
      heading = 'Your Education Guide';
      tagline = 'Knowledge is the first step toward prevention. Here is what you need to know.';
      articleKey = 'education';
      resultType = 'education';
      planPoints = [
        'Explore the curated articles below',
        'Visit the Drug Knowledge Centre for in-depth information',
        'Share resources with someone who might benefit',
      ];
      break;
    case 3:
      heading = 'Supporting Someone You Care About';
      tagline = 'Helping a loved one takes courage. Here are tools and guidance to support them without losing yourself.';
      articleKey = 'family';
      resultType = 'family';
      planPoints = [
        'Read the family support guides below',
        'Connect with family counselling services near you',
        'Learn how to have a supportive conversation',
        'Take care of your own wellbeing too',
      ];
      break;
    case 4:
      heading = 'Health Guidance for You';
      tagline = 'Your health matters. Here is how to access the right care.';
      articleKey = 'healthcare';
      resultType = 'healthcare';
      planPoints = [
        'If experiencing withdrawal symptoms, seek medical attention immediately',
        'Review the healthcare guidance articles below',
        'Locate a healthcare facility near you using the services tab',
      ];
      break;
    case 5:
    default:
      heading = 'Professional Support Directory';
      tagline = 'Connecting you with verified professionals who can help.';
      articleKey = 'services';
      resultType = 'services';
      planPoints = [
        'Browse local services in the Support Services tab',
        'Contact the NDDCB Hotline: 1926 for immediate referrals',
        'Ask our AI Assistant to help you choose the right service',
      ];
      break;
  }

  return { heading, tagline, articleKey, planPoints, resultType };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ArticleCard({ article }) {
  return (
    <div style={{
      background: 'rgba(36,36,38,0.7)',
      border: '1px solid rgba(216,190,130,0.15)',
      borderRadius: 'var(--radius-md)',
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(216,190,130,0.3)';
        e.currentTarget.style.background = 'rgba(36,36,38,0.9)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(216,190,130,0.15)';
        e.currentTarget.style.background = 'rgba(36,36,38,0.7)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 10px', borderRadius: 100,
          background: 'rgba(216,190,130,0.1)',
          color: 'var(--gold)', fontSize: 12, fontWeight: 600,
        }}>
          {article.icon} {article.tag}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{article.readTime} read</span>
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ivory)', lineHeight: 1.3 }}>{article.title}</h4>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{article.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--gold)', fontSize: 13, fontWeight: 500, marginTop: 'auto' }}>
        Read article <ArrowRight size={14} />
      </div>
    </div>
  );
}

function ServiceRow({ service }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '16px 20px',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(36,36,38,0.6)',
      border: '1px solid rgba(216,190,130,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--ivory)' }}>{service.name}</span>
            {service.verified && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100,
                background: 'rgba(34,197,94,0.15)', color: '#4ade80',
              }}>
                ✓ Verified
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{service.type}</div>
        </div>
        <a href={`tel:${service.phone}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 14px', borderRadius: 'var(--radius-sm)',
          background: 'rgba(216,190,130,0.1)', border: '1px solid rgba(216,190,130,0.3)',
          color: 'var(--gold)', fontSize: 13, fontWeight: 600,
          textDecoration: 'none', flexShrink: 0,
        }}>
          <Phone size={13} /> {service.phone}
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
        <MapPin size={13} /> {service.address}
      </div>
    </div>
  );
}

// ── Main Result Component ─────────────────────────────────────────────────────

export default function WizardResult({ answers, onRestart }) {
  const [activeTab, setActiveTab] = useState('plan');
  const { heading, tagline, articleKey, planPoints, resultType } = getResultConfig(answers);

  const province = answers[8]?.province;
  const services = SERVICES_BY_PROVINCE[province] || SERVICES_BY_PROVINCE['default'];
  const isEmergency = answers[5] === 'withdrawal';
  const articles = ARTICLES[articleKey] || ARTICLES['education'];

  const tabs = [
    { id: 'plan',      label: 'Your Plan',       icon: <Star size={15} /> },
    { id: 'education', label: 'Education',        icon: <BookOpen size={15} /> },
    { id: 'services',  label: 'Support Services', icon: <MapPin size={15} /> },
    { id: 'ai',        label: 'AI Assistant',     icon: <MessageSquare size={15} /> },
  ];

  return (
    <div style={{ width: '100%', animation: 'fadeInUp 0.5s ease' }}>

      {/* Emergency banner */}
      {isEmergency && (
        <div style={{
          background: 'rgba(220,38,38,0.15)',
          border: '1.5px solid rgba(220,38,38,0.5)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
        }}>
          <AlertTriangle size={22} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#f87171', marginBottom: 4 }}>Urgent Medical Attention May Be Needed</div>
            <div style={{ fontSize: 14, color: 'var(--ivory-dim)', lineHeight: 1.5 }}>
              Withdrawal symptoms can be life-threatening. Please contact a healthcare provider immediately or call <strong>1926</strong> (NDDCB Hotline) or go to your nearest hospital emergency department.
            </div>
            <a href="tel:1926" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 10, padding: '8px 18px', borderRadius: 'var(--radius-sm)',
              background: 'rgba(220,38,38,0.4)', color: '#fca5a5',
              fontWeight: 700, fontSize: 14,
            }}>
              <Phone size={14} /> Call 1926 Now
            </a>
          </div>
        </div>
      )}

      {/* Result heading */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px', borderRadius: 100,
          background: 'rgba(216,190,130,0.1)', border: '1px solid rgba(216,190,130,0.25)',
          color: 'var(--gold)', fontSize: 13, fontWeight: 600,
          marginBottom: 16,
        }}>
          <Star size={13} /> Your Personalised Guidance
        </div>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 700,
          color: 'var(--ivory)',
          marginBottom: 12,
          lineHeight: 1.2,
        }}>
          {heading}
        </h1>
        <p style={{
          fontSize: 15,
          color: 'var(--text-secondary)',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.65,
        }}>
          {tagline}
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 4,
        marginBottom: 24,
        background: 'rgba(36,36,38,0.6)',
        border: '1px solid rgba(216,190,130,0.12)',
        borderRadius: 'var(--radius-md)',
        padding: 4,
        overflowX: 'auto',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: '1 1 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === tab.id ? 'rgba(216,190,130,0.15)' : 'transparent',
              color: activeTab === tab.id ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Your Plan */}
      {activeTab === 'plan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: 'rgba(36,36,38,0.7)',
            border: '1px solid rgba(216,190,130,0.15)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 28px',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold)', marginBottom: 16 }}>
              Recommended Next Steps
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {planPoints.map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(216,190,130,0.15)',
                    border: '1px solid rgba(216,190,130,0.3)',
                    color: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--ivory-dim)', lineHeight: 1.5, paddingTop: 2 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <a href="/assistant" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '16px 20px', borderRadius: 'var(--radius-md)',
              background: 'rgba(216,190,130,0.1)',
              border: '1.5px solid rgba(216,190,130,0.3)',
              color: 'var(--gold)', textDecoration: 'none',
              fontWeight: 600, fontSize: 14,
              transition: 'all 0.2s ease',
            }}>
              <MessageSquare size={18} /> Talk to AI Assistant
            </a>
            <a href="/support" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '16px 20px', borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.03)',
              border: '1.5px solid rgba(216,190,130,0.15)',
              color: 'var(--ivory)', textDecoration: 'none',
              fontWeight: 500, fontSize: 14,
              transition: 'all 0.2s ease',
            }}>
              <MapPin size={18} /> Find Support Services
            </a>
          </div>

          {/* Emergency section */}
          <div style={{
            padding: '14px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(36,36,38,0.5)',
            border: '1px solid rgba(216,190,130,0.08)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <Phone size={18} color="var(--gold)" />
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--ivory)' }}>NDDCB Crisis Hotline:</strong>{' '}
              <a href="tel:1926" style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none' }}>1926</a>
              {' '} — Available 24 hours, 7 days a week
            </span>
          </div>
        </div>
      )}

      {/* Tab: Education */}
      {activeTab === 'education' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
            Curated articles based on your responses:
          </p>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
          <a href="/drugs" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px', borderRadius: 'var(--radius-md)',
            border: '1px dashed rgba(216,190,130,0.3)',
            color: 'var(--gold)', textDecoration: 'none',
            fontSize: 14, fontWeight: 500,
            transition: 'all 0.2s ease',
          }}>
            <BookOpen size={15} /> Explore full Drug Knowledge Centre <ChevronRight size={14} />
          </a>
        </div>
      )}

      {/* Tab: Support Services */}
      {activeTab === 'services' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {province && province !== 'not_sure' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 4, fontSize: 14, color: 'var(--text-secondary)',
            }}>
              <MapPin size={14} color="var(--gold)" />
              Showing services for: <strong style={{ color: 'var(--gold)' }}>{province} Province</strong>
            </div>
          )}
          {services.map((service, i) => (
            <ServiceRow key={i} service={service} />
          ))}
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, padding: '0 4px', lineHeight: 1.5 }}>
            ℹ️ Service information is for guidance only. Please verify contact details directly before visiting. All contact numbers are illustrative — verify with the NDDCB.
          </div>
          <a href="/support" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px', borderRadius: 'var(--radius-md)',
            border: '1px dashed rgba(216,190,130,0.3)',
            color: 'var(--gold)', textDecoration: 'none',
            fontSize: 14, fontWeight: 500,
            marginTop: 4,
          }}>
            <MapPin size={15} /> View full Services Directory <ChevronRight size={14} />
          </a>
        </div>
      )}

      {/* Tab: AI Assistant */}
      {activeTab === 'ai' && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 24, padding: '32px 20px', textAlign: 'center',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(216,190,130,0.1)',
            border: '2px solid rgba(216,190,130,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MessageSquare size={30} color="var(--gold)" />
          </div>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ivory)', marginBottom: 10 }}>
              AI-Guided Support
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 400, lineHeight: 1.65 }}>
              Our AI Assistant is available 24/7 for anonymous, confidential conversations. It can answer questions, offer coping techniques, and help you navigate support options.
            </p>
          </div>
          <div style={{
            padding: '14px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(216,190,130,0.08)',
            border: '1px solid rgba(216,190,130,0.2)',
            fontSize: 13,
            color: 'var(--text-secondary)',
            maxWidth: 400,
            lineHeight: 1.6,
          }}>
            <Shield size={14} style={{ display: 'inline', marginRight: 6, color: 'var(--gold)' }} />
            Conversations are anonymous and not stored. This AI does not replace professional medical advice.
          </div>
          <a href="/assistant" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 32px', borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
            color: '#101113', fontWeight: 700, fontSize: 15,
            textDecoration: 'none', boxShadow: '0 4px 20px rgba(216,190,130,0.3)',
          }}>
            <MessageSquare size={16} /> Start Conversation
          </a>
        </div>
      )}

      {/* Footer actions */}
      <div style={{
        marginTop: 32,
        paddingTop: 24,
        borderTop: '1px solid rgba(216,190,130,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Not what you were looking for?
        </span>
        <button
          onClick={onRestart}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            border: '1px solid rgba(216,190,130,0.25)',
            color: 'var(--ivory-dim)', fontSize: 14,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
        >
          Start over
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
