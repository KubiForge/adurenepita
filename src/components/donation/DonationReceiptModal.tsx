import React from 'react';
import { Modal } from '../common/Modal';
import { DonationRecord } from '../../types/donation';
import { Button } from '../common/Button';
import { CheckCircle2, Download, ShieldCheck, Heart } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface DonationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DonationRecord;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  isOpen,
  onClose,
  record,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <span>Donation Verified & Acknowledged</span>
        </div>
      }
    >
      <div className="space-y-5 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <Heart className="w-7 h-7 fill-emerald-500/20" />
        </div>

        <div>
          <div className="inline-block px-2.5 py-0.5 rounded bg-gold/20 border border-gold/40 text-[10px] uppercase font-mono font-bold text-gold mb-1">
            Sandbox / Preview Mode Record
          </div>
          <span className="block text-xs uppercase tracking-wider text-gold font-bold">
            Sample Acknowledgment Receipt (Test Mode)
          </span>
          <h3 className="text-2xl font-bold font-heading text-ivory mt-0.5">
            Thank You For Standing with Us
          </h3>
          <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
            ඔබගේ මානුෂීය සහයෝගයට හදපිරි ස්තූතිය!
          </p>
          <p className="text-xs text-ivory/60 mt-1">
            Your generous gift directly impacts youth across Sri Lanka.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="p-4 rounded-xl bg-midnight border border-gold/30 text-left space-y-2.5 text-xs text-ivory/80">
          <div className="flex items-center justify-between pb-2 border-b border-charcoal-light">
            <span className="text-ivory/50">Reference ID:</span>
            <span className="font-mono font-bold text-champagne">{record.referenceId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ivory/50">Amount:</span>
            <span className="font-bold text-ivory text-sm">
              {record.currency} {record.amount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ivory/50">Payment Status:</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              {record.paymentStatus}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ivory/50">Allocation:</span>
            <span className="text-ivory font-medium text-right max-w-[200px] truncate">
              {record.campaignAllocation}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ivory/50">Date:</span>
            <span className="text-ivory font-mono">
              {new Date(record.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="pt-2 border-t border-charcoal-light text-[11px] text-ivory/50">
            <strong>Drive Receipt Archive Path:</strong> {record.receiptDriveReference}
            <span className="block text-[10px] text-gold/70 mt-0.5">
              (Preview: Live PDF generated once Google Apps Script Drive integration is deployed)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="gold" size="sm" onClick={onClose}>
            Back to Website
          </Button>
        </div>
      </div>
    </Modal>
  );
};
