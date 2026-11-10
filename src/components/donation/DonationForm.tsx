import React, { useState } from 'react';
import { Currency, PaymentProvider, DonationRecord } from '../../types/donation';
import { paymentService } from '../../services/paymentService';
import { Button } from '../common/Button';
import { Heart, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { DonationReceiptModal } from './DonationReceiptModal';

export const DonationForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(3500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('LKR');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedicationMessage, setDedicationMessage] = useState('');
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('payhere');
  const [allocation, setAllocation] = useState('Campus Youth Peer Mentorship & Digital Awareness');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedRecord, setCompletedRecord] = useState<DonationRecord | null>(null);

  const suggestedAmounts: { [key in Currency]: number[] } = {
    LKR: [1500, 3500, 7500, 15000, 25000],
    USD: [10, 25, 50, 100, 250],
    EUR: [10, 25, 50, 100, 200],
    GBP: [10, 20, 50, 100, 200],
  };

  const handleSelectSuggested = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    setIsProcessing(true);

    try {
      const initiateRes = await paymentService.initiateDonation({
        amount,
        currency,
        isRecurring,
        frequency: isRecurring ? 'monthly' : 'one_time',
        donorName: isAnonymous ? undefined : donorName.trim(),
        donorEmail: isAnonymous ? undefined : donorEmail.trim(),
        dedicationMessage: dedicationMessage.trim() || undefined,
        isAnonymous,
        paymentProvider,
        campaignAllocation: allocation,
      });

      // Simulate payment gateway redirect and verified callback
      const providerTxnId = `${paymentProvider.toUpperCase()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      const verifyRes = await paymentService.verifyPayment(
        initiateRes.referenceId,
        providerTxnId,
        'verified'
      );

      if (verifyRes.success && verifyRes.record) {
        setCompletedRecord(verifyRes.record);
      }
    } catch (err) {
      console.error('Donation initiation error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="charcoal-card p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl border border-gold/40">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-3 text-gold shadow-gold-subtle">
          <Heart className="w-6 h-6 fill-gold/20" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
          Empower Hope & Prevention
        </h2>
        <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
          අඳුරෙන් එළියට - ඔබේ සහයෝගය අනාගතයක් බේරාගනී
        </p>
        <p className="text-xs text-ivory/60 mt-2 max-w-md mx-auto leading-relaxed">
          100% of public contributions directly fund university awareness drives, school workshops, and digital health tools by the Leo Club of University of Sri Jayewardenepura.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Frequency Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-midnight border border-charcoal-light">
          <button
            type="button"
            onClick={() => setIsRecurring(false)}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              !isRecurring
                ? 'bg-gold text-midnight shadow-sm'
                : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            One-Time Donation
          </button>
          <button
            type="button"
            onClick={() => setIsRecurring(true)}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              isRecurring
                ? 'bg-gold text-midnight shadow-sm'
                : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            Monthly Sustainer
          </button>
        </div>

        {/* Currency & Suggested Amounts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gold">
              Select Amount ({currency})
            </label>
            <div className="flex gap-1">
              {(['LKR', 'USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCurrency(c);
                    setAmount(suggestedAmounts[c][1]);
                    setCustomAmount('');
                  }}
                  className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold transition-colors ${
                    currency === c
                      ? 'bg-charcoal text-gold border border-gold/40'
                      : 'text-ivory/50 hover:text-ivory'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
            {suggestedAmounts[currency].map((val) => {
              const isSelected = amount === val && !customAmount;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectSuggested(val)}
                  className={`py-3 px-2 rounded-xl border text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-gold text-midnight border-gold shadow-gold-subtle'
                      : 'bg-midnight/70 text-ivory/80 border-charcoal-light hover:border-gold/40'
                  }`}
                >
                  {currency === 'LKR' ? `Rs. ${val.toLocaleString()}` : `${currency} ${val}`}
                </button>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-xs font-mono font-bold text-gold">
              {currency}
            </span>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="Or enter a custom amount..."
              value={customAmount}
              onChange={handleCustomChange}
              className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Campaign Allocation Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/70 mb-1.5">
            Direct My Support To:
          </label>
          <select
            value={allocation}
            onChange={(e) => setAllocation(e.target.value)}
            className="w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
          >
            <option value="Campus Youth Peer Mentorship & Digital Awareness">
              Campus Youth Peer Mentorship & Digital Awareness
            </option>
            <option value="Drug Knowledge Centre & Clinical Grounding">
              Drug Knowledge Centre & Clinical Grounding
            </option>
            <option value="Island-wide High School Caravans">
              Island-wide High School Caravans
            </option>
            <option value="General Drug Prevention & Recovery Support">
              Where Needed Most (General Prevention)
            </option>
          </select>
        </div>

        {/* Donor Details (Optional) */}
        <div className="space-y-3 pt-2 border-t border-charcoal-light">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
            />
            <span className="text-xs text-ivory/90 font-medium">
              Make this contribution anonymous (do not list my name)
            </span>
          </label>

          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs text-ivory/70 mb-1">Your Name / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Ruwan Perera"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs text-ivory/70 mb-1">Email for Official Receipt</label>
                <input
                  type="email"
                  placeholder="e.g. ruwan@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-ivory/70 mb-1">
              Dedication or Encouraging Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. In honor of youth in Sri Lanka fighting for recovery."
              value={dedicationMessage}
              onChange={(e) => setDedicationMessage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Payment Provider Gateway Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-2">
            Secure Payment Gateway
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'payhere', label: 'PayHere (LKR)', note: 'Cards & Genie' },
              { id: 'webxpay', label: 'WebXPay (LKR)', note: 'Bank & LankaQR' },
              { id: 'stripe', label: 'Stripe (Global)', note: 'Visa & MC' },
            ].map((gw) => (
              <button
                key={gw.id}
                type="button"
                onClick={() => setPaymentProvider(gw.id as PaymentProvider)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentProvider === gw.id
                    ? 'bg-charcoal border-gold text-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light text-ivory/60 hover:border-gold/30'
                }`}
              >
                <span className="font-bold text-xs block">{gw.label}</span>
                <span className="text-[10px] text-ivory/40">{gw.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Security & Financial Notice */}
        <div className="p-3.5 rounded-xl bg-midnight/80 border border-charcoal-light flex items-start gap-2.5 text-xs text-ivory/60 leading-relaxed">
          <Lock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <span>
            <strong>Secure Processing:</strong> Your card data and banking credentials are never collected or stored on this website. Payments are encrypted and verified server-side through authorized gateway providers.
          </span>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full text-base font-bold shadow-gold-glow"
          isLoading={isProcessing}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isRecurring ? 'Commit Monthly Gift' : 'Complete Donation'}: {currency}{' '}
          {amount.toLocaleString()}
        </Button>
      </form>

      {/* Confirmation Modal */}
      {completedRecord && (
        <DonationReceiptModal
          isOpen={!!completedRecord}
          onClose={() => setCompletedRecord(null)}
          record={completedRecord}
        />
      )}
    </div>
  );
};
