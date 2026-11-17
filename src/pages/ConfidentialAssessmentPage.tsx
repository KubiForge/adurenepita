import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldCheck,
  Lock,
  MessageCircle,
  CalendarCheck,
  RotateCcw,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';

interface AssessmentQuestion {
  id: string;
  text: string;
  weight: number;
  emergency?: boolean;
}

const questions: AssessmentQuestion[] = [
  {
    id: 'frequency',
    text: 'In the past month, how often have you used alcohol or drugs more than you intended?',
    weight: 1,
  },
  {
    id: 'control',
    text: 'Have you found it difficult to stop or reduce use, even when you wanted to?',
    weight: 2,
  },
  {
    id: 'cravings',
    text: 'Have cravings or withdrawal symptoms affected your sleep, work, studies, or relationships?',
    weight: 2,
  },
  {
    id: 'overdose',
    text: 'Have you recently had slowed or stopped breathing, blue lips, seizures, collapse, or been difficult to wake?',
    weight: 3,
    emergency: true,
  },
  {
    id: 'withdrawal',
    text: 'After stopping or reducing alcohol or sedative medicine, have you had severe shaking, confusion, seizures, hallucinations, or fever?',
    weight: 3,
    emergency: true,
  },
  {
    id: 'safety',
    text: 'Have you thought about self-harm or felt that you may not be safe today?',
    weight: 3,
    emergency: true,
  },
  {
    id: 'impact',
    text: 'Has substance use caused serious health, family, financial, academic, or employment problems?',
    weight: 2,
  },
];

const answerOptions = [
  { label: 'No', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
];

export const ConfidentialAssessmentPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const hasEmergencyAnswer = questions.some(
    (question) => question.emergency && (answers[question.id] ?? 0) >= 1
  );

  const score = useMemo(
    () =>
      questions.reduce((total, question) => {
        const answer = answers[question.id] ?? 0;
        return total + answer * question.weight;
      }, 0),
    [answers]
  );

  const result = hasEmergencyAnswer
    ? {
        level: 'Immediate support needed',
        tone: 'text-red-200',
        border: 'border-red-400/40',
        background: 'bg-red-950/30',
        description:
          'Your answers indicate possible overdose, dangerous withdrawal, or immediate safety risk. This is not a diagnosis, but urgent medical or crisis support is recommended now.',
      }
    : score >= 11
      ? {
          level: 'Severe risk',
          tone: 'text-red-300',
          border: 'border-red-400/30',
          background: 'bg-red-950/20',
          description:
            'The pattern of your answers suggests a high level of concern. A confidential professional assessment is strongly recommended.',
        }
      : score >= 6
        ? {
            level: 'Moderate risk',
            tone: 'text-amber-200',
            border: 'border-amber-400/30',
            background: 'bg-amber-950/20',
            description:
              'Your answers suggest a meaningful level of concern. Professional counseling or medical advice can help you understand your options.',
          }
        : {
            level: 'Mild or low risk',
            tone: 'text-emerald-300',
            border: 'border-emerald-400/30',
            background: 'bg-emerald-950/20',
            description:
              'Your answers suggest lower current risk, but the result is not a diagnosis. Prevention, support, and medical advice remain available.',
          };

  const updateAnswer = (questionId: string, value: number) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const resetAssessment = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
          <ShieldCheck className="h-3.5 w-3.5" />
          Anonymous confidential assessment
        </span>
        <h1 className="mt-5 font-heading text-4xl font-bold text-ivory sm:text-5xl">
          Check Your Substance-Use Risk
        </h1>
        <p className="mt-4 text-sm leading-6 text-ivory/65">
          This private self-assessment is educational and does not diagnose addiction or replace a
          qualified health professional. Answers remain in this browser session and are not submitted.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Privacy notices">
        <div className="rounded-xl border border-gold/15 bg-charcoal/40 p-4">
          <Lock className="h-4 w-4 text-gold" />
          <p className="mt-2 text-xs leading-5 text-ivory/65">No name, phone number, or identity is required.</p>
        </div>
        <div className="rounded-xl border border-gold/15 bg-charcoal/40 p-4">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <p className="mt-2 text-xs leading-5 text-ivory/65">No answer is sent unless you separately submit a support request.</p>
        </div>
        <div className="rounded-xl border border-gold/15 bg-charcoal/40 p-4">
          <AlertTriangle className="h-4 w-4 text-gold" />
          <p className="mt-2 text-xs leading-5 text-ivory/65">Immediate danger is routed to real emergency support.</p>
        </div>
      </section>

      {!showResult ? (
        <section className="mt-8 space-y-4" aria-label="Assessment questions">
          <div className="flex items-center justify-between text-xs text-ivory/50">
            <span>Answers are kept only in this browser session</span>
            <span>{answeredCount} of {questions.length} answered</span>
          </div>

          {questions.map((question, index) => (
            <article
              key={question.id}
              className="rounded-2xl border border-charcoal-light bg-charcoal/45 p-5 sm:p-6"
            >
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                  {index + 1}
                </span>
                <h2 className="text-sm font-semibold leading-6 text-ivory sm:text-base">{question.text}</h2>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {answerOptions.map((option) => (
                  <button
                    type="button"
                    key={option.label}
                    onClick={() => updateAnswer(question.id, option.value)}
                    className={`min-h-11 rounded-xl border px-2 py-2 text-xs font-bold transition ${
                      answers[question.id] === option.value
                        ? 'border-gold bg-gold text-midnight'
                        : 'border-charcoal-light bg-midnight/60 text-ivory/70 hover:border-gold/40'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={resetAssessment}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ivory/10 px-4 py-3 text-xs font-bold text-ivory/70 hover:border-gold/30"
            >
              <RotateCcw className="h-4 w-4" />
              Clear Answers
            </button>
            <button
              type="button"
              onClick={() => setShowResult(true)}
              disabled={answeredCount !== questions.length}
              className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              View Private Result
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      ) : (
        <section className="mt-8 space-y-5" aria-live="polite">
          <div className={`rounded-3xl border p-6 sm:p-8 ${result.border} ${result.background}`}>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ivory/50">
              Private assessment result
            </span>
            <h2 className={`mt-2 font-heading text-3xl font-bold ${result.tone}`}>{result.level}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ivory/75">{result.description}</p>
          </div>

          {hasEmergencyAnswer ? (
            <div className="rounded-2xl border border-red-400/40 bg-red-950/30 p-5">
              <h3 className="flex items-center gap-2 font-bold text-red-100">
                <AlertTriangle className="h-5 w-5" />
                Take urgent action
              </h3>
              <p className="mt-2 text-xs leading-6 text-ivory/70">
                Call Suwaseriya 1990 for immediate medical danger, NDDCB 1927 for drug support, or CCC 1333
                for crisis support. If you may self-harm, stay with a trusted person and seek emergency care.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={telephoneHref(CONTACT_INFO.emergency.ambulance.number)}
                  className="btn-gold inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call 1990
                </a>
                <a
                  href={telephoneHref(CONTACT_INFO.emergency.crisisSupport.number)}
                  className="btn-charcoal inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                >
                  <PhoneCall className="h-4 w-4 text-gold" />
                  Call 1333
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/assistant"
                className="rounded-2xl border border-gold/20 bg-charcoal/45 p-5 transition hover:border-gold/45"
              >
                <MessageCircle className="h-5 w-5 text-gold" />
                <h3 className="mt-3 font-heading text-lg font-bold text-ivory">Confidential AI chat</h3>
                <p className="mt-2 text-xs leading-5 text-ivory/60">
                  Ask questions anonymously and receive educational support and safety guidance.
                </p>
              </Link>
              <Link
                to="/support-directory"
                className="rounded-2xl border border-gold/20 bg-charcoal/45 p-5 transition hover:border-gold/45"
              >
                <CalendarCheck className="h-5 w-5 text-gold" />
                <h3 className="mt-3 font-heading text-lg font-bold text-ivory">Find a counselor</h3>
                <p className="mt-2 text-xs leading-5 text-ivory/60">
                  Browse verified facilities and request a confidential professional assessment or booking.
                </p>
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={resetAssessment}
            className="inline-flex items-center gap-2 rounded-xl border border-ivory/10 px-4 py-3 text-xs font-bold text-ivory/70"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Assessment
          </button>
        </section>
      )}
    </div>
  );
};
