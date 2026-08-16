import React from "react";
import { Mail, MessageCircle, MapPin, Sparkles, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Beauty Concierge</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Connect With Our Skin Specialists
        </h1>
        <p className="text-xs text-foreground/60">
          Have a question regarding routine compatibility or order tracking? We are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact info (5 cols) */}
        <div className="md:col-span-5 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 sm:p-8 shadow-glass space-y-6">
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-brand-100 text-brand-700">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-foreground block">Email Inquiries</span>
                <span className="text-foreground/70">concierge@luminaaura.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-gold-100 text-gold-700">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-foreground block">Live Chat Widget</span>
                <span className="text-foreground/70">Available 24/7 at bottom right</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-lavender-100 text-lavender-700">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-foreground block">Boutique Atelier</span>
                <span className="text-foreground/70">Paris • New York • London</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 rounded-3xl bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl border border-white/80 dark:border-white/10 p-6 sm:p-8 shadow-glass space-y-4">
          <h3 className="font-serif text-lg font-bold text-foreground">Send a Message</h3>
          <form className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Full Name</label>
                <input type="text" placeholder="Elena Rostova" className="w-full p-2.5 rounded-xl glass-input text-xs" />
              </div>
              <div>
                <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Email</label>
                <input type="email" placeholder="elena@example.com" className="w-full p-2.5 rounded-xl glass-input text-xs" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Subject</label>
              <input type="text" placeholder="Routine advice for sensitive skin..." className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-foreground/70 mb-1 block">Message</label>
              <textarea rows={4} placeholder="How can our beauty specialists help you?" className="w-full p-2.5 rounded-xl glass-input text-xs" />
            </div>
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
