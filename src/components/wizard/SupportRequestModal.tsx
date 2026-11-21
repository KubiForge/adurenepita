import React, { useMemo, useState } from 'react';
import { Modal } from '../common/Modal';
import { WizardAnswers } from '../../types/wizard';
import { SupportCenter } from '../../types/directory';
import { Copy, Download, Mail, MessageCircle, Printer, Share2, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SupportRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: WizardAnswers;
  centers: SupportCenter[];
}

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const SupportRequestModal: React.FC<SupportRequestModalProps> = ({
  isOpen,
  onClose,
  answers,
  centers,
}) => {
  const { language } = useLanguage();
  const [anonymous, setAnonymous] = useState(true);
  const [reportSubject, setReportSubject] = useState<'myself' | 'someone_else'>('myself');
  const [preferredName, setPreferredName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [permissionToShare, setPermissionToShare] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [assistance, setAssistance] = useState<string[]>(['professional_counselling']);
  const [accuracyConsent, setAccuracyConsent] = useState(false);
  const [summaryConsent, setSummaryConsent] = useState(false);
  const [shareConsent, setShareConsent] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const reference = useMemo(
    () => `BTD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    [isOpen],
  );

  const substanceText = answers.substances.length
    ? answers.substances.map((item) => item.replace(/_/g, ' ')).join(', ')
    : 'Not specified';

  const reportHtml = useMemo(() => {
    const selectedCentre = centers.find((center) => center.id === recipient);
    return `
      <article style="font-family:Arial,sans-serif;color:#252b35;max-width:820px;margin:auto;padding:24px">
        <header style="border-bottom:3px solid #8f1d2c;padding-bottom:16px">
          <p style="color:#8f1d2c;font-weight:bold;margin:0">BEYOND THE DARKNESS</p>
          <h1 style="font-family:Georgia,serif;color:#641522;margin:8px 0">Confidential Support Summary</h1>
          <p><strong>Reference:</strong> ${escapeHtml(reference)} &nbsp; | &nbsp; <strong>Generated:</strong> ${escapeHtml(new Date().toLocaleDateString())}</p>
        </header>
        <section style="margin-top:22px">
          <h2 style="color:#641522">Request overview</h2>
          <p><strong>Request prepared for:</strong> ${reportSubject === 'myself' ? 'Myself' : 'Someone else'}</p>
          <p><strong>Person:</strong> ${anonymous ? 'Anonymous support summary' : escapeHtml(preferredName || 'Preferred name not provided')}</p>
          ${ageRange ? `<p><strong>Age range:</strong> ${escapeHtml(ageRange)}</p>` : ''}
          ${relationship && reportSubject === 'someone_else' ? `<p><strong>Relationship:</strong> ${escapeHtml(relationship)}</p>` : ''}
          ${!anonymous && contactNumber ? `<p><strong>Contact number:</strong> ${escapeHtml(contactNumber)}</p>` : ''}
          ${!anonymous && contactEmail ? `<p><strong>Contact email:</strong> ${escapeHtml(contactEmail)}</p>` : ''}
          <p><strong>Preferred language:</strong> ${escapeHtml(language)}</p>
          <p><strong>Location shared:</strong> ${escapeHtml([answers.locality, answers.district, answers.province].filter(Boolean).join(', ') || 'Not provided')}</p>
          <p><strong>Reason:</strong> ${escapeHtml(answers.purpose?.replace(/_/g, ' ') || 'Not specified')}</p>
          ${selectedCentre ? `<p><strong>Preferred support destination:</strong> ${escapeHtml(selectedCentre.name)}<br>${escapeHtml(selectedCentre.address)}<br>${escapeHtml(selectedCentre.phone)}</p>` : '<p><strong>Preferred support destination:</strong> Not specified</p>'}
        </section>
        <section style="margin-top:22px">
          <h2 style="color:#641522">Substance-related information</h2>
          <p><strong>Substance(s):</strong> ${escapeHtml(substanceText)}</p>
          <p><strong>Current situation:</strong> ${escapeHtml(answers.currentState?.replace(/_/g, ' ') || 'Not specified')}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(answers.duration?.replace(/_/g, ' ') || 'Not specified')}</p>
          <p><strong>Areas of concern:</strong> ${escapeHtml(answers.concerns.map((item) => item.replace(/_/g, ' ')).join(', ') || 'Not specified')}</p>
        </section>
        <section style="margin-top:22px">
          <h2 style="color:#641522">Health, support and additional context</h2>
          <p><strong>Health information:</strong> ${escapeHtml(answers.healthInfo || 'Not provided')}</p>
          <p><strong>Immediate safety concern reported:</strong> ${answers.urgentSymptoms?.includes('immediate_emergency') ? 'Yes. Seek emergency medical help now.' : 'Not reported in this summary'}</p>
          <p><strong>Requested assistance:</strong> ${escapeHtml(assistance.join(', ').replace(/_/g, ' ') || 'Not specified')}</p>
          <p><strong>Additional context:</strong> ${escapeHtml(answers.additionalContext || 'Not provided')}</p>
        </section>
        <footer style="margin-top:28px;border-top:1px solid #d6b16d;padding-top:14px;font-size:12px">
          <p><strong>Confidential support summary</strong></p>
          <p>This document is a user-prepared support summary intended to help communicate a request for assistance. It is not a medical diagnosis, clinical assessment, treatment plan, or official institutional record. All information should be independently assessed by an appropriately qualified professional.</p>
        </footer>
      </article>`;
  }, [anonymous, reportSubject, preferredName, relationship, ageRange, contactNumber, contactEmail, answers, assistance, recipient, centers, reference, substanceText]);

  const printReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html lang="${language}"><head><meta charset="utf-8"><title>Confidential Support Summary</title><style>@page{size:A4;margin:16mm}body{font-family:Arial,sans-serif;color:#252b35;line-height:1.55}h2{break-after:avoid}article{max-width:780px;margin:auto;padding:24px}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>${reportHtml}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.setTimeout(() => printWindow.print(), 250);
  };

  const preparedMessage =
    shareMessage ||
    'Dear Support Team,\n\nI am contacting you to request guidance and assistance regarding a substance-related concern.\nI have prepared a confidential support summary containing the information I am comfortable sharing.\nI would appreciate guidance regarding the appropriate next steps and available support services.\n\nThank you.';

  const handleEmail = () => {
    if (!canShare) return;
    if (!emailAddress.trim()) {
      window.alert('Enter the support recipient email address first.');
      return;
    }
    window.location.href = `mailto:${encodeURIComponent(emailAddress)}?subject=${encodeURIComponent('Confidential Request for Support – Beyond the Darkness')}&body=${encodeURIComponent(preparedMessage)}`;
  };

  const handleWhatsApp = () => {
    if (!canShare) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(preparedMessage)}`, '_blank', 'noopener,noreferrer');
  };

  const handleMessenger = async () => {
    if (!canShare) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
    } catch {
      window.alert('Copy the prepared message before continuing to Messenger.');
    }
    window.open('https://www.messenger.com/', '_blank', 'noopener,noreferrer');
  };

  const handleCopyReference = async () => {
    if (!canShare) return;
    try {
      await navigator.clipboard.writeText(`Confidential support report reference: ${reference}`);
      window.alert('The report reference was copied. No report was uploaded or sent.');
    } catch {
      window.alert(`Report reference: ${reference}`);
    }
  };

  const handleNativeShare = async () => {
    if (!canShare) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Confidential Support Summary', text: preparedMessage });
      } else {
        await navigator.clipboard.writeText(preparedMessage);
        window.alert('The support message was copied. It was not sent automatically.');
      }
    } catch {
      window.alert('The share sheet could not be opened. The report was not sent.');
    }
  };

  const canGenerate = accuracyConsent && summaryConsent;
  const canShare = canGenerate && shareConsent && (reportSubject === 'myself' || permissionToShare);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div>
          <span className="block">Prepare Your Confidential Support Report</span>
          <span className="block text-[10px] font-normal text-ivory/50 sm:text-xs">
            A clear summary for a doctor, counsellor, or support professional
          </span>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-3 text-xs leading-5 text-ivory/70">
          <ShieldCheck className="mr-2 inline h-4 w-4 text-gold" />
          This summary stays in the current browser until you choose to print or share it. Nothing is sent automatically.
        </div>

        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-xs font-bold text-gold">Who is this report about?</legend>
          <button type="button" onClick={() => setAnonymous(true)} className={`rounded-xl border p-4 text-left ${anonymous ? 'border-gold bg-gold/10' : 'border-charcoal-light bg-midnight/60'}`}>
            <strong className="block text-sm text-ivory">Create an anonymous summary</strong>
            <span className="mt-1 block text-xs text-ivory/60">No name or contact details required</span>
          </button>
          <button type="button" onClick={() => setAnonymous(false)} className={`rounded-xl border p-4 text-left ${!anonymous ? 'border-gold bg-gold/10' : 'border-charcoal-light bg-midnight/60'}`}>
            <strong className="block text-sm text-ivory">Add a preferred name or initials</strong>
            <span className="mt-1 block text-xs text-ivory/60">Only provide what you choose to share</span>
          </button>
        </fieldset>

        <fieldset className="space-y-3 rounded-xl border border-charcoal-light p-4">
          <legend className="px-2 text-xs font-bold text-gold">Whose support request is this?</legend>
          <div className="flex flex-wrap gap-2">
            {([{ value: 'myself', label: 'Myself' }, { value: 'someone_else', label: 'Someone else' }] as const).map((option) => (
              <button key={option.value} type="button" aria-pressed={reportSubject === option.value} onClick={() => setReportSubject(option.value)} className={`min-h-11 rounded-xl border px-4 text-xs font-semibold ${reportSubject === option.value ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal-light text-ivory/70'}`}>
                {option.label}
              </button>
            ))}
          </div>
          {!anonymous && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-ivory/75">Age range (optional)
                <select value={ageRange} onChange={(event) => setAgeRange(event.currentTarget.value)} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm text-ivory">
                  <option value="">Prefer not to say</option><option>Under 18</option><option>18–24</option><option>25–34</option><option>35–44</option><option>45–59</option><option>60 or over</option>
                </select>
              </label>
              {reportSubject === 'someone_else' && <label className="text-xs text-ivory/75">Your relationship (optional)<input value={relationship} onChange={(event) => setRelationship(event.currentTarget.value.slice(0, 80))} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm text-ivory" /></label>}
              <label className="text-xs text-ivory/75">Contact number (optional)<input type="tel" value={contactNumber} onChange={(event) => setContactNumber(event.currentTarget.value.slice(0, 40))} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm text-ivory" /></label>
              <label className="text-xs text-ivory/75">Contact email (optional)<input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.currentTarget.value.slice(0, 160))} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm text-ivory" /></label>
            </div>
          )}
          {reportSubject === 'someone_else' && (
            <label className="flex items-start gap-3 text-xs leading-5 text-ivory/75">
              <input type="checkbox" checked={permissionToShare} onChange={(event) => setPermissionToShare(event.currentTarget.checked)} />
              <span>I have permission or another appropriate basis to include this person’s information in a report I choose to share.</span>
            </label>
          )}
        </fieldset>

        {!anonymous && (
          <label className="block text-xs font-semibold text-ivory/80">
            Preferred name or initials (optional)
            <input value={preferredName} onChange={(event) => setPreferredName(event.target.value)} maxLength={80} className="mt-2 w-full rounded-xl border border-charcoal-light bg-midnight p-3 text-sm text-ivory" />
          </label>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-ivory/80">
            Preferred support destination
            <select value={recipient} onChange={(event) => setRecipient(event.target.value)} className="mt-2 w-full rounded-xl border border-charcoal-light bg-midnight p-3 text-sm text-ivory">
              <option value="">Leave unspecified</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>{center.name}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="mb-2 text-xs font-semibold text-ivory/80">Assistance requested</legend>
            {[
              ['initial_assessment', 'Initial medical assessment'],
              ['professional_counselling', 'Professional counselling'],
              ['rehabilitation_info', 'Rehabilitation admission information'],
              ['family_guidance', 'Family guidance'],
              ['follow_up', 'Follow-up support'],
            ].map(([value, label]) => (
              <label key={value} className="mr-3 inline-flex items-center gap-2 py-1 text-xs text-ivory/75">
                <input type="checkbox" checked={assistance.includes(value)} onChange={(event) => setAssistance((current) => event.target.checked ? [...current, value] : current.filter((item) => item !== value))} />
                {label}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="space-y-3 rounded-xl border border-charcoal-light bg-midnight/40 p-4">
          <label className="flex items-start gap-3 text-xs text-ivory/80">
            <input type="checkbox" checked={accuracyConsent} onChange={(event) => setAccuracyConsent(event.target.checked)} />
            <span>I confirm that the information entered is accurate to the best of my knowledge.</span>
          </label>
          <label className="flex items-start gap-3 text-xs text-ivory/80">
            <input type="checkbox" checked={summaryConsent} onChange={(event) => setSummaryConsent(event.target.checked)} />
            <span>I understand this is a support summary, not a medical diagnosis or official record.</span>
          </label>
          <label className="flex items-start gap-3 text-xs text-ivory/80">
            <input type="checkbox" checked={shareConsent} onChange={(event) => setShareConsent(event.target.checked)} />
            <span>I understand sharing is voluntary and that email, WhatsApp, and Messenger privacy is handled by those services.</span>
          </label>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" disabled={!canGenerate} onClick={printReport} className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold disabled:opacity-50">
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
          <button type="button" disabled={!canGenerate} onClick={() => { window.open('data:text/html;charset=utf-8,' + encodeURIComponent(reportHtml), '_blank', 'noopener,noreferrer'); }} className="btn-charcoal inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold disabled:opacity-50">
            <Download className="h-4 w-4" /> Preview Report
          </button>
        </div>

        {shareConsent && (
          <div className="space-y-3 rounded-xl border border-gold/20 p-4">
            <h3 className="text-sm font-bold text-ivory">Share my support report</h3>
            {reportSubject === 'someone_else' && !permissionToShare && <p role="alert" className="text-xs text-amber-200">Before sharing another person’s information, confirm you have permission or an appropriate basis.</p>}
            <textarea value={shareMessage} onChange={(event) => setShareMessage(event.target.value)} placeholder="Review or edit the prepared message" rows={5} className="w-full rounded-xl border border-charcoal-light bg-midnight p-3 text-xs text-ivory" />
            <input type="email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} placeholder="Recipient email address" className="w-full rounded-xl border border-charcoal-light bg-midnight p-3 text-xs text-ivory" />
            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={!canShare} onClick={handleEmail} className="btn-charcoal inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs disabled:opacity-40"><Mail className="h-4 w-4" /> Email</button>
              <button type="button" disabled={!canShare} onClick={handleWhatsApp} className="btn-charcoal inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs disabled:opacity-40"><MessageCircle className="h-4 w-4" /> WhatsApp</button>
              <button type="button" disabled={!canShare} onClick={handleMessenger} className="btn-charcoal inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs disabled:opacity-40"><MessageCircle className="h-4 w-4" /> Copy message &amp; open Messenger</button>
              <button type="button" disabled={!canShare} onClick={handleCopyReference} className="btn-charcoal inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs disabled:opacity-40"><Copy className="h-4 w-4" /> Copy report reference</button>
              <button type="button" disabled={!canShare} onClick={handleNativeShare} className="btn-charcoal inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs disabled:opacity-40"><Share2 className="h-4 w-4" /> Other sharing options</button>
            </div>
            <p className="text-[11px] text-ivory/50">Email opens your mail app; it does not attach or send the PDF. WhatsApp and Messenger do not receive the report file here. Print or save the report separately, then attach it yourself if you choose. These services process anything you share through them.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
