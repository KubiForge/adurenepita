import React from 'react';
import { DonationForm } from '../components/donation/DonationForm';
import { ShieldCheck, Heart, FileCheck, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../config/assets';

export const DonatePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <section
        className="relative isolate overflow-hidden rounded-3xl border border-gold/25 px-6 py-10 sm:px-10 sm:py-14"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16, 17, 19, 0.96) 0%, rgba(16, 17, 19, 0.84) 48%, rgba(16, 17, 19, 0.3) 100%), url(${ASSETS.donateBg})`,
          backgroundPosition: 'center, right center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">Give hope a way forward</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
            Help make support easier to reach.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-ivory/80">
            Your contribution supports prevention education, community outreach, and accessible support resources.
          </p>
        </div>
      </section>

      <DonationForm />

      {/* Financial Transparency Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="charcoal-card p-6 border-charcoal-light text-center">
          <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-2" />
          <h4 className="font-heading font-bold text-base text-ivory">Zero Card Storage</h4>
          <p className="text-xs text-ivory/60 mt-1">
            Card numbers, CVVs, and banking passwords are never processed or retained on our servers.
          </p>
        </div>

        <div className="charcoal-card p-6 border-charcoal-light text-center">
          <FileCheck className="w-8 h-8 text-gold mx-auto mb-2" />
          <h4 className="font-heading font-bold text-base text-ivory">Drive PDF Receipts</h4>
          <p className="text-xs text-ivory/60 mt-1">
            Official digitized tax-exempt donation acknowledgments are issued into restricted Google Drive records.
          </p>
        </div>

        <div className="charcoal-card p-6 border-charcoal-light text-center">
          <CheckCircle2 className="w-8 h-8 text-gold mx-auto mb-2" />
          <h4 className="font-heading font-bold text-base text-ivory">Club Audited Ledger</h4>
          <p className="text-xs text-ivory/60 mt-1">
            Reconciled by the treasurer and project leadership under Lions International audit guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
