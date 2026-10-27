import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactFormSchema, ContactFormData } from '../../lib/schemas.js';
import { sendContactForm } from '../../lib/api.js';
import { Button } from '../common/Button.js';
import { ZodError } from 'zod';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    try {
      ContactFormSchema.parse(formData);
      setErrors({});
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach(e => {
          if (e.path[0]) {
            fieldErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await sendContactForm(formData);
      setSubmittedSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#ffffff', '#f4f4f5', '#d4d4d8', '#a1a1aa', '#27272a']
        });
      } catch {
        // Confetti non-fatal
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      });
    } catch (err) {
      setServerError((err as Error).message || 'Failed to dispatch inquiry. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#050505] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-mono font-bold bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15">
            Initiate Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white mt-4 tracking-tight">
            Contact & Consultation Portal
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2">
            Reach out regarding technical advisory, architecture consulting, or high-caliber autonomous AI engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Card Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-zinc-900 dark:text-white" />
                <span>Direct Channels</span>
              </h3>

              <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-950 dark:text-white block">Email</span>
                    <a
                      href="mailto:contact@kairosvance.dev"
                      className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors font-mono text-xs sm:text-sm"
                    >
                      contact@kairosvance.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-zinc-900 dark:text-zinc-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-950 dark:text-white block">Location</span>
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      San Francisco, California • Available globally for remote contracts
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-950 dark:text-white block">Response Expectation</span>
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      Within 24 business hours. Messages are recorded securely in the Supabase audit queue.
                    </span>
                  </div>
                </div>
              </div>

              {/* Security & Spam Prevention Note */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-400 space-y-1 font-mono">
                <p className="text-zinc-950 dark:text-white font-semibold">🔒 Security Guarantees:</p>
                <p>• IP-rate limited (max 5 submissions / 15m)</p>
                <p>• Honeypot crawler trap enabled</p>
                <p>• End-to-end schema sanitization</p>
              </div>
            </div>
          </div>

          {/* Form Card Right */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/10 relative">
              {submittedSuccess ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-950 dark:text-white border border-zinc-300 dark:border-white/20 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Inquiry Dispatched!</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for reaching out. Your message has been encrypted and stored in Kairos&apos;s administrative inbox. You will receive a response shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this field</label>
                    <input
                      type="text"
                      id="hp_field"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {serverError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-300 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Elena Rostova"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zinc-300 dark:border-white/10 focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-mono">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.rostova@enterprise.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zinc-300 dark:border-white/10 focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">
                      Subject / Intent *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Strategic Advisory on Autonomous Agent Architecture"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none transition-colors ${
                        errors.subject
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-zinc-300 dark:border-white/10 focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-mono">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">
                      Message Details *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share project scope, target timeline, technical requirements, or inquiry specifics..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none transition-colors resize-y ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-zinc-300 dark:border-white/10 focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white'
                      }`}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message ? (
                        <p className="text-[11px] text-red-500 dark:text-red-400 font-mono">{errors.message}</p>
                      ) : <span />}
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {formData.message.length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full justify-center"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Transmit Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
