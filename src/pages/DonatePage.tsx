import React from 'react';
import { DonationForm } from '../components/donation/DonationForm';
import { ShieldCheck, Heart, FileCheck, CheckCircle2 } from 'lucide-react';

export const DonatePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
