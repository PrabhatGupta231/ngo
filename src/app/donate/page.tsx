"use client";

import { useState, useEffect, Suspense } from "react";
import { formatINR } from "@/lib/formatCurrency";
import { useSearchParams } from "next/navigation";
import { CreditCard, QrCode, Shield, Check, Heart, Loader2, Smartphone } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import confetti from "canvas-confetti";

function DonationForm() {
  const searchParams = useSearchParams();
  
  // Preset Amounts
  const presetAmounts = [500, 1000, 2500, 5000];

  // States
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("general");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [claimTax, setClaimTax] = useState(false);
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [transactionRef, setTransactionRef] = useState<string>("");

  // Dynamic pre-fill from URL
  useEffect(() => {
    const campaignId = searchParams.get("campaign");
    if (campaignId) {
      const exists = campaigns.some((c) => c.id === campaignId);
      if (exists) {
        setSelectedCampaign(campaignId);
      }
    }
  }, [searchParams]);

  const handleAmountPreset = (amt: number) => {
    setAmount(amt);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
  };

  // Generate UPI Deep Link
  const upiLink = `upi://pay?pa=sewaprith@ybl&pn=SewaPrith%20Foundation&am=${amount || 1000}&cu=INR&tn=Donation%20to%20SewaPrith`;

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return alert("Please select or enter a valid amount.");
    if (!name || !email || !phone) return alert("Please enter your name, email, and phone number.");
    if (claimTax && (!pan || !address)) return alert("Please fill in your PAN and address to claim 80G tax benefit.");

    const ref = `SP-${Math.floor(Math.random() * 90000000 + 10000000)}`;
    setTransactionRef(ref);
    setIsProcessing(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          amount,
          campaign: campaigns.find((c) => c.id === selectedCampaign)?.title ?? "General Welfare Fund",
          transactionRef: ref,
          claimTax,
          pan: claimTax ? pan : undefined,
          address: claimTax ? address : undefined,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Donation submission failed. Please try again.");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Donation submission failed. Please try again.";
      setSubmitError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl text-center max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto animate-bounce">
          <Heart className="w-10 h-10 fill-current" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-secondary">Thank You, {name}!</h2>
          <p className="text-sm text-slate-500">Your donation of <span className="font-extrabold text-primary">₹{formatINR(amount)}</span> has been received. A receipt has been sent to <span className="font-semibold text-secondary">{email}</span>.</p>
        </div>
        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed text-left space-y-1">
          <p><span className="font-bold">Transaction Reference:</span> {transactionRef}</p>
          <p><span className="font-bold">Date:</span> {new Date().toLocaleDateString("en-IN")}</p>
          <p><span className="font-bold">Allocated To:</span> {campaigns.find(c => c.id === selectedCampaign)?.title || "General Welfare Fund"}</p>
          {claimTax && (
            <>
              <p><span className="font-bold">PAN Number:</span> {pan.toUpperCase()}</p>
              <p><span className="font-bold">80G Certificate:</span> An official tax-exemption receipt will be emailed to <span className="font-bold text-secondary">{email}</span> within 24 hours.</p>
            </>
          )}
        </div>
        <button
          onClick={() => {
            setIsSuccess(false);
            setName("");
            setEmail("");
            setPhone("");
            setPan("");
            setAddress("");
            setClaimTax(false);
            setAmount(1000);
            setTransactionRef("");
          }}
          className="w-full inline-flex items-center justify-center py-3 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <form onSubmit={handleSubmitDonation} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 lg:col-span-2">
        {/* Cause selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Choose Campaign Program</label>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-semibold"
          >
            <option value="general">General NGO Fund (Where Need is Greatest)</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Section */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Amount (INR)</label>
          <div className="grid grid-cols-4 gap-3">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleAmountPreset(amt)}
                className={`py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                  amount === amt && customAmount === ""
                    ? "bg-primary text-white shadow-md shadow-primary/10 scale-102"
                    : "bg-slate-50 hover:bg-slate-100 text-secondary border border-slate-100"
                }`}
              >
                ₹{formatINR(amt)}
              </button>
            ))}
          </div>
          
          {/* Custom Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span>
            <input
              type="number"
              min="10"
              placeholder="Enter Custom Amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm pl-8 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-extrabold"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Donor Identity Details</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium"
            />
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              placeholder="10-Digit Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium"
            />
          </div>
        </div>

        {/* 80G Checkbox */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="taxClaim"
              checked={claimTax}
              onChange={(e) => setClaimTax(e.target.checked)}
              className="w-4.5 h-4.5 text-primary border-slate-350 rounded focus:ring-primary cursor-pointer"
            />
            <label htmlFor="taxClaim" className="text-xs md:text-sm font-bold text-secondary cursor-pointer select-none">
              Claim 80G Tax Exemption Benefit (50% Tax Rebate)
            </label>
          </div>

          {claimTax && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <input
                  type="text"
                  required
                  placeholder="PAN Card Number (10 Alphanumeric)"
                  value={pan}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-bold uppercase placeholder:normal-case"
                />
                <span className="text-[10px] text-slate-400 block pl-1">Required to generate tax receipt under Section 80G</span>
              </div>
              <input
                type="text"
                required
                placeholder="Full Home Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-slate-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-secondary font-medium"
              />
            </div>
          )}
        </div>

        {/* Payment Checkout Options */}
        <div className="space-y-4 pt-4 border-t border-slate-50">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Choose Checkout Gateway</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center gap-2.5 py-4 border rounded-2xl text-sm font-bold cursor-pointer transition-all ${
                paymentMethod === "card"
                  ? "border-primary bg-primary/5 text-primary scale-102"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-secondary"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Card / Netbanking
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`flex items-center justify-center gap-2.5 py-4 border rounded-2xl text-sm font-bold cursor-pointer transition-all ${
                paymentMethod === "upi"
                  ? "border-primary bg-primary/5 text-primary scale-102"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-secondary"
              }`}
            >
              <QrCode className="w-5 h-5" />
              Instant UPI QR
            </button>
          </div>
        </div>

        {/* Checkout Button */}
        {paymentMethod === "card" ? (
          <>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center py-4 rounded-2xl text-base font-bold text-white bg-accent-coral hover:bg-accent-coral-hover transition-colors shadow-lg shadow-accent-coral/20 cursor-pointer disabled:bg-slate-350 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing donation...
                </>
              ) : (
                <>
                  Proceed to Pay ₹{formatINR(amount)} Securely
                </>
              )}
            </button>
            {/* Inline Error Banner */}
            {submitError && (
              <div className="mt-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-600 font-semibold">
                ⚠️ {submitError}
              </div>
            )}
          </>
        ) : (
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 text-center space-y-2 text-xs text-primary font-bold">
            UPI QR fallback is enabled below. Scan with GPay/PhonePe to make instant donations.
          </div>
        )}
      </form>

      {/* Static UPI QR Sidebar */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-6 h-fit">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase bg-primary-light text-primary px-3 py-1 rounded-full">
            UPI Fallback
          </span>
          <h3 className="text-lg font-extrabold text-secondary mt-2">Scan QR Code to Pay</h3>
          <p className="text-xs text-slate-500">Supports Bhim, Google Pay, PhonePe, and Paytm.</p>
        </div>

        {/* Styled QR placeholder */}
        <div className="relative p-4 border border-slate-150 rounded-2xl bg-white shadow-inner shrink-0 aspect-square w-48 flex items-center justify-center">
          {/* Mock QR details using nested border blocks for look */}
          <div className="absolute inset-4 border-4 border-slate-900 rounded flex flex-wrap p-2 gap-1.5 opacity-85">
            <div className="w-10 h-10 border-4 border-slate-900 rounded shrink-0" />
            <div className="flex-grow flex flex-col gap-1 justify-between py-1">
              <div className="h-2 bg-slate-950 rounded w-full" />
              <div className="h-2 bg-slate-950 rounded w-2/3" />
            </div>
            <div className="w-full flex gap-1.5 items-end justify-between mt-auto">
              <div className="h-2 bg-slate-950 rounded w-1/2" />
              <div className="w-10 h-10 border-4 border-slate-900 rounded shrink-0" />
            </div>
          </div>
          {/* Logo center badge */}
          <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-primary shadow z-10">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="w-full text-xs text-slate-500 space-y-1.5 bg-slate-50 rounded-xl p-3 border border-slate-100 font-medium">
          <p><span className="font-bold text-secondary">VPA:</span> sewaprith@ybl</p>
          <p><span className="font-bold text-secondary">Payee:</span> SewaPrith Welfare Foundation</p>
          <p><span className="font-bold text-secondary">Current Amount:</span> ₹{formatINR(amount)}</p>
        </div>

        {/* Mobile Deep Link */}
        <a
          href={upiLink}
          className="w-full inline-flex items-center justify-center py-3 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-colors shadow-md shadow-primary/10 group"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Pay via Mobile UPI App
        </a>

        {/* Trust badge */}
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
          <Shield className="w-4 h-4 text-primary shrink-0" />
          <span>PCI-DSS Compliant & Secured</span>
        </div>
      </div>
    </div>
  );
}

export default function Donate() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Support Us</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Make a Secure Donation</h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              100% of your contributions go directly to buying textbooks, diagnostic clinic kits, and warm kitchen meals. 
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Wrapper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Suspense fallback={<div className="text-center py-12 text-slate-500 font-bold">Loading donation settings...</div>}>
          <DonationForm />
        </Suspense>
      </section>
    </div>
  );
}
