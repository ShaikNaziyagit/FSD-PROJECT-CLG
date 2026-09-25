import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Receipt,
  Download,
  Printer,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  X,
  Sparkles,
  ArrowRight,
  Wallet,
} from 'lucide-react';

const FeesPage = () => {
  const [feeData, setFeeData] = useState([]);
  const [summary, setSummary] = useState({
    totalDue: 68200,
    totalPaid: 58500,
    studentName: 'Arjun Sharma',
    rollNumber: '22BCSE1042',
    department: 'CSE',
  });
  const [loading, setLoading] = useState(true);

  // Payment Modal state
  const [payingFee, setPayingFee] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [receiptModal, setReceiptModal] = useState(null);

  useEffect(() => {
    const fetchFeeData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/fees');
        if (res.data) setFeeData(res.data);
        if (res.summary) setSummary(res.summary);
      } catch (err) {
        console.error('Failed to load fees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeData();
  }, []);

  const handleSimulatePayment = async () => {
    if (!payingFee) return;
    setProcessingPayment(true);

    try {
      const res = await api.post('/fees/pay', {
        feeId: payingFee._id,
        paymentMethod,
      });

      // Update local state
      setFeeData((prev) =>
        prev.map((f) =>
          f._id === payingFee._id
            ? {
                ...f,
                status: 'Paid',
                paidAt: new Date(),
                transactionId: res.receipt?.transactionId || `TXN_${Date.now()}`,
                receiptNumber: res.receipt?.receiptNumber || `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
              }
            : f
        )
      );

      setSummary((prev) => ({
        ...prev,
        totalDue: Math.max(0, prev.totalDue - payingFee.amount),
        totalPaid: prev.totalPaid + payingFee.amount,
      }));

      setReceiptModal({
        ...res.receipt,
        feeType: payingFee.feeType,
        amount: payingFee.amount,
        breakdown: payingFee.breakdown,
        semester: payingFee.semester || 6,
        academicYear: payingFee.academicYear || '2025-2026',
      });

      setPayingFee(null);
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Retrieving University Financial Ledger..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-emerald-500/20 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-teal-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              DIRECTORATE OF FINANCE & ACCOUNTS // STUDENT LEDGER
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fee Payments &{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Digital Receipts
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Pay semester tuition, examination fees, hostel charges, and campus bus pass with instant payment verification, 0% gateway surcharge, and official digital receipts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-black/40 rounded-2xl border border-white/10 text-right">
              <span className="text-[10px] text-stone-400 block font-mono">STUDENT ENROLLMENT</span>
              <span className="text-sm font-bold text-white">{summary.rollNumber}</span>
              <span className="text-[10px] text-orange-300 block">{summary.studentName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={AlertTriangle}
          label="Total Pending Dues"
          value={`₹${summary.totalDue?.toLocaleString()}`}
          change={summary.totalDue > 0 ? 'Pay before deadline' : 'Zero dues pending'}
          changeType={summary.totalDue > 0 ? 'negative' : 'positive'}
          color="rose"
        />
        <StatCard
          icon={CheckCircle2}
          label="Total Cleared (YTD)"
          value={`₹${summary.totalPaid?.toLocaleString()}`}
          change="Verified receipts"
          changeType="positive"
          color="emerald"
        />
        <StatCard
          icon={Clock}
          label="Upcoming Due Date"
          value="15th Next Month"
          change="Extended without late fee"
          changeType="neutral"
          color="amber"
        />
        <StatCard
          icon={ShieldCheck}
          label="Financial Standing"
          value={summary.totalDue === 0 ? 'Exemplary' : 'Active Balance'}
          change="Eligible for Hall Ticket"
          changeType="positive"
          color="orange"
        />
      </div>

      {/* Fee Items Table / Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Receipt className="w-5 h-5 text-orange-400" />
          <span>Semester Fee Invoices & Payment Schedule</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feeData.map((fee) => {
            const isPaid = fee.status === 'Paid';

            return (
              <GlassCard
                key={fee._id}
                hoverEffect
                className={`p-6 flex flex-col justify-between space-y-4 ${
                  isPaid ? 'border-emerald-500/20' : 'border-amber-500/30'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase">
                        Semester {fee.semester} • {fee.academicYear}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{fee.feeType}</h3>
                    </div>

                    <span className="text-lg font-mono font-extrabold text-white">
                      ₹{fee.amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Due Date & Status */}
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-black/30 border border-white/5 mb-3">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Due Date: <strong className="text-slate-200">{new Date(fee.dueDate).toLocaleDateString()}</strong>
                    </span>

                    <Badge variant={isPaid ? 'emerald' : 'amber'} size="xs">
                      {isPaid ? 'Paid & Verified' : 'Pending Payment'}
                    </Badge>
                  </div>

                  {/* Breakdown details */}
                  {fee.breakdown && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-300">Itemized Breakdown:</span>
                      <div className="space-y-1">
                        {fee.breakdown.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs text-slate-400"
                          >
                            <span>{item.item}</span>
                            <span className="font-mono text-slate-300">₹{item.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  {isPaid ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Txn ID: {fee.transactionId?.slice(-10) || 'VERIFIED'}
                      </span>

                      <GlassButton
                        variant="secondary"
                        size="sm"
                        icon={Receipt}
                        onClick={() =>
                          setReceiptModal({
                            feeType: fee.feeType,
                            amount: fee.amount,
                            breakdown: fee.breakdown,
                            transactionId: fee.transactionId,
                            receiptNumber: fee.receiptNumber,
                            paidAt: fee.paidAt,
                            studentName: summary.studentName,
                            rollNumber: summary.rollNumber,
                            semester: fee.semester,
                            academicYear: fee.academicYear,
                            paymentMethod: fee.paymentMethod || 'UPI',
                          })
                        }
                      >
                        View Receipt
                      </GlassButton>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] text-amber-300">Zero Convenience Charge</span>
                      <GlassButton
                        variant="primary"
                        size="sm"
                        icon={CreditCard}
                        onClick={() => setPayingFee(fee)}
                      >
                        Pay Online (₹{fee.amount.toLocaleString()})
                      </GlassButton>
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Simulated Payment Gateway Modal */}
      {payingFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel p-6 rounded-3xl border border-orange-500/40 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setPayingFee(null)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gateway Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-black text-stone-950">
                ₹
              </div>
              <div>
                <h3 className="font-bold text-white text-base">CampusPay Gateway</h3>
                <p className="text-[11px] text-stone-400">Encrypted 256-Bit SSL Secured Fee Checkout</p>
              </div>
            </div>

            {/* Invoiced Amount */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">TOTAL PAYABLE AMOUNT</span>
                <span className="text-xs font-semibold text-stone-200">{payingFee.feeType}</span>
              </div>
              <span className="text-2xl font-mono font-extrabold text-orange-300">
                ₹{payingFee.amount.toLocaleString()}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-300">Select Payment Instrument:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                  { id: 'Net Banking', label: 'Net Banking', icon: Wallet },
                  { id: 'Card', label: 'Debit/Credit', icon: CreditCard },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPaymentMethod(item.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === item.id
                        ? 'bg-orange-500/20 border-orange-500/60 text-orange-300 shadow-lg shadow-orange-500/10'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated UPI QR / Options */}
            {paymentMethod === 'UPI' && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center space-y-2">
                <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-stone-900" />
                </div>
                <p className="text-[11px] text-stone-400 font-mono">Scan via GPay, PhonePe, or Paytm UPI</p>
              </div>
            )}

            {/* Confirm Payment Button */}
            <div className="pt-2">
              <button
                onClick={handleSimulatePayment}
                disabled={processingPayment}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-400 text-stone-950 font-extrabold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {processingPayment ? (
                  <span>Authorizing with Banking Core...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{payingFee.amount.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal (Printable) */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="max-w-xl w-full bg-stone-950 p-6 sm:p-8 rounded-3xl border border-white/20 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setReceiptModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Official Header */}
            <div className="text-center pb-4 border-b border-white/15 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2 font-bold">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-base font-black text-white uppercase tracking-wide">
                CAMPII CONNECTED UNIVERSITY
              </h2>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                OFFICIAL UNIVERSITY ELECTRONIC FEE RECEIPT
              </p>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                PAYMENT STATUS: CLEARED & RECONCILED
              </span>
            </div>

            {/* Receipt Meta Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-black/40 p-4 rounded-2xl border border-white/10">
              <div>
                <span className="text-stone-400 block text-[10px]">Receipt Number:</span>
                <span className="font-mono font-bold text-white">{receiptModal.receiptNumber}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Transaction ID:</span>
                <span className="font-mono text-orange-300">{receiptModal.transactionId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Student Name:</span>
                <span className="font-semibold text-white">{receiptModal.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Student Roll No:</span>
                <span className="font-mono font-bold text-white">{receiptModal.rollNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Fee Description:</span>
                <span className="text-slate-200">{receiptModal.feeType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Payment Instrument:</span>
                <span className="text-slate-200">{receiptModal.paymentMethod}</span>
              </div>
            </div>

            {/* Fee Itemization Table */}
            {receiptModal.breakdown && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pb-1 border-b border-white/10">
                  <span>Particulars</span>
                  <span>Amount (INR)</span>
                </div>
                {receiptModal.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-300">
                    <span>{item.item}</span>
                    <span className="font-mono">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Grand Total */}
            <div className="pt-3 border-t-2 border-white/20 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Total Amount Paid:</span>
              <span className="text-xl font-mono font-extrabold text-emerald-400">
                ₹{receiptModal.amount?.toLocaleString()}
              </span>
            </div>

            {/* Verification Sign */}
            <div className="pt-2 text-center text-[10px] text-slate-500 font-mono">
              Digitally certified by Directorate of Finance & Accounts. No physical signature mandated.
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <GlassButton
                variant="secondary"
                size="sm"
                icon={Printer}
                onClick={() => window.print()}
              >
                Print / Save Receipt
              </GlassButton>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => setReceiptModal(null)}
              >
                Done
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesPage;
