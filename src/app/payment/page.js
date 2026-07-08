'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { ApiService } from '@/utils/api';

export default function PaymentPage() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const displayToast = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3200);
    };

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        try {
            const data = await ApiService.upgradeSubscription();
            displayToast("Payment verified successfully!");
            setTimeout(() => {
                router.push('/dashboard?subscription=success');
            }, 1000);
        } catch (err) {
            displayToast(`Upgrade failed: ${err.message}`);
            setIsProcessing(false);
        }
    };

    // Google Chart API QR Generator using upi deep linking string
    const qrCodeUrl = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" + encodeURIComponent("upi://pay?pa=resumex@upi&pn=ResumeX&am=199&cu=INR");

    return (
        <AppShell title="Secure Checkout">
            <div className="card mobile-padding-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <i className="fa-solid fa-credit-card text-gradient"></i> UPI Payment Gateway
                </h3>
                <p className="card-desc" style={{ textAlign: 'center', marginBottom: '32px' }}>
                    Complete payment of **₹199** to upgrade your account to the Premium monthly tier.
                </p>

                {/* QR Code Container */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', margin: '20px 0' }}>
                    <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-glow)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={qrCodeUrl} 
                            alt="UPI QR Code" 
                            style={{ width: '200px', height: '200px', display: 'block' }}
                        />
                    </div>
                    
                    <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <div>Merchant Name: <strong>ResumeX</strong></div>
                        <div style={{ marginTop: '4px' }}>UPI ID: <strong style={{ color: 'var(--primary-glow)' }}>resumex@upi</strong></div>
                        <div style={{ marginTop: '4px' }}>Amount: <strong>₹199.00 INR</strong></div>
                    </div>
                </div>

                {/* Payment Instructions */}
                <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', margin: '24px 0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>
                        Instructions:
                    </h4>
                    <ol style={{ paddingLeft: '16px', color: 'var(--text-secondary)' }}>
                        <li>Open your preferred UPI application (GPay, PhonePe, Paytm, BHIM, etc.).</li>
                        <li>Scan the QR code above or enter the UPI ID manually.</li>
                        <li>Verify the merchant name is <strong>ResumeX</strong>.</li>
                        <li>Initiate and authorize the payment of <strong>₹199</strong>.</li>
                        <li>Once the payment is approved, click the button below to confirm.</li>
                    </ol>
                </div>

                {/* Confirm Action Button */}
                <button 
                    className="action-btn primary-btn" 
                    style={{ width: '100%', height: '48px', fontSize: '0.95rem', cursor: 'pointer' }}
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing Upgrade...</>
                    ) : (
                        <><i className="fa-solid fa-circle-check"></i> Confirm Payment (Simulated)</>
                    )}
                </button>
            </div>

            {/* Notification Toast */}
            <div className={`toast-notice ${showToast ? 'show' : ''}`} id="toast-notice">
                <span className="toast-message">{toastMessage}</span>
            </div>
        </AppShell>
    );
}
