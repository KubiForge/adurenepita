import React from 'react';
import { DonationForm } from '../components/donation/DonationForm';
import { AlertTriangle, BookOpen, ClipboardCheck, Landmark, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../config/contactInfo';

export const DonatePage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-12 lg:px-8">
      <section
        className="relative isolate overflow-hidden rounded-2xl border border-gold/25 px-5 py-8 sm:rounded-3xl sm:px-10 sm:py-14"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16, 17, 19, 0.96) 0%, rgba(16, 17, 19, 0.84) 48%, rgba(16, 17, 19, 0.3) 100%), url(${ASSETS.donateBg})`,
          backgroundPosition: 'center, right center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Donation transparency</span>
          <h1 className="break-words font-heading text-3xl font-bold text-ivory sm:text-4xl">
            Support prevention and recovery in Sri Lanka
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-ivory/80">
            Read what is currently confirmed, what is still being prepared, and how to request verified
            donation information before sending funds.
          </p>
        </div>
      </section>

      <DonationForm />

      <section aria-labelledby="donation-transparency-title" className="space-y-4">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Purpose, approvals & reporting</span>
          <h2 id="donation-transparency-title" className="mt-1 font-heading text-2xl font-bold text-ivory sm:text-3xl">
            Public information and current limitations
          </h2>
          <p className="mt-2 text-xs leading-5 text-ivory/60">
            We do not publish unverified bank details, approval claims, spending totals, or impact figures.
            The project team must verify and publish supporting records before donation intake opens.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border border-charcoal-light bg-charcoal/60 p-5">
            <BookOpen className="h-5 w-5 text-gold" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-ivory">Intended program purpose</h3>
            <p className="mt-2 text-xs leading-5 text-ivory/60">
              The project’s stated focus includes prevention education, community outreach, and maintaining
              support-navigation resources. No allocation percentages or outcomes are being claimed here.
            </p>
          </article>

          <article className="rounded-2xl border border-charcoal-light bg-charcoal/60 p-5">
            <Landmark className="h-5 w-5 text-gold" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-ivory">Approvals and payment details</h3>
            <p className="mt-2 text-xs leading-5 text-ivory/60">
              Government or NGO approval documents and an authorized bank or gateway account are not
              published on this page. Do not treat this website as proof of approval.
            </p>
          </article>

          <article className="rounded-2xl border border-charcoal-light bg-charcoal/60 p-5">
            <ClipboardCheck className="h-5 w-5 text-gold" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-ivory">Audit and annual reports</h3>
            <p className="mt-2 text-xs leading-5 text-ivory/60">
              No independently reviewed public spending or annual donation report is linked here yet.
              Verified totals will only be published with an approved reporting source.
            </p>
          </article>

          <article className="rounded-2xl border border-gold/20 bg-gold/5 p-5">
            <ShieldCheck className="h-5 w-5 text-gold" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-ivory">Anonymity and donor privacy</h3>
            <p className="mt-2 text-xs leading-5 text-ivory/60">
              An anonymous-donation option is not currently active because payment intake is paused. Never
              email payment credentials or sensitive banking information.
            </p>
          </article>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-red-400/20 bg-red-950/15 p-4 text-xs leading-5 text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-200" aria-hidden="true" />
            Verify current instructions directly with the organizing team before making any contribution.
          </p>
          <div className="flex flex-wrap gap-3 sm:shrink-0">
            <Link to="/campaigns" className="font-semibold text-champagne underline">Campaign information</Link>
            <Link to="/network" className="font-semibold text-champagne underline">Partner directory</Link>
            <a href={`mailto:${CONTACT_INFO.project.email}`} className="font-semibold text-champagne underline">Contact team</a>
          </div>
        </div>
      </section>
    </div>
  );
};
