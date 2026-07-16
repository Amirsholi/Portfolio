import { ArrowLeft, ExternalLink, Mail, ShieldCheck } from "lucide-react";

const updated = "July 15, 2026";

const pages = {
  privacy: {
    eyebrow: "SampleX legal",
    title: "Privacy Policy",
    intro: "SampleX is designed to process recorded tab audio locally. The extension does not upload recordings, waveform data or audio analysis to Amir Sholi's servers.",
    sections: [
      ["Information handled by the extension", "When you press REC, SampleX captures audio from the active browser tab for the user-requested recording, trimming, BPM/key analysis and WAV export. Recordings, editing state, remaining free exports and license activation state are stored locally in the browser. Permanent license tokens may use Chrome Sync so they can be restored on the same Google profile."],
      ["Information handled during purchase", "Payments are processed by Polar as merchant of record. SampleX does not receive or store card numbers. After a completed purchase, Polar sends the order identifier, checkout identifier, purchased product, amount, currency and customer email to the SampleX server so a signed license can be generated, delivered and recovered."],
      ["How information is used", "Purchase information is used only to fulfill orders, recover licenses, provide support, prevent duplicate fulfillment, handle refunds and meet legal or accounting obligations. Audio and browsing content are not used for advertising, analytics, profiling or model training."],
      ["Sharing and retention", "Payment information is handled by Polar under its own policies. Order and license records are stored with Supabase. If transactional email is enabled, the customer email and license code are sent through the configured email provider solely to deliver the purchase. Records are retained as needed for license recovery, fraud prevention, accounting and legal obligations."],
      ["Security and choices", "Server credentials and the private signing key are not included in the extension. License codes are cryptographically signed and server communication uses HTTPS. You can remove local extension data by uninstalling SampleX or clearing its storage. Chrome Sync data is controlled through your Google account. Contact support to request access, correction or deletion where applicable."],
      ["Chrome Web Store Limited Use", "The use of information received from Google APIs adheres to the Chrome Web Store User Data Policy, including the Limited Use requirements. SampleX does not sell user data, use it for personalized advertising or permit humans to read recorded audio."],
    ],
  },
  terms: {
    eyebrow: "SampleX legal",
    title: "Terms of Use and Purchase",
    intro: "These terms apply to the SampleX Chrome extension, its free export allowance and the one-time lifetime license.",
    sections: [
      ["Permitted use", "SampleX is intended for audio you own, created, licensed, or otherwise have permission to record and export. You are responsible for complying with copyright, platform terms and applicable recording laws."],
      ["Licenses and free exports", "A new installation includes the stated free export allowance. A Lifetime license permanently unlocks exports for the Chrome profile where it is activated and may be restored through Chrome Sync when available. Codes may not be resold, shared publicly or used to bypass the licensing system."],
      ["Payments", "Checkout, taxes, invoices and payment processing are provided by Polar as merchant of record. Prices and currencies shown at checkout control if they differ from promotional text."],
      ["Availability", "SampleX is provided on an as-available basis. Reasonable support will be provided for valid purchases, but uninterrupted compatibility with every website, media format, Chrome version or third-party service cannot be guaranteed."],
      ["Changes", "Features, compatibility and these terms may be updated as SampleX evolves. Material changes affecting data practices will be disclosed as required."],
    ],
  },
  refunds: {
    eyebrow: "SampleX purchases",
    title: "Refund Policy",
    intro: "If SampleX does not work as described, contact support with the email used at checkout and the Polar order or checkout reference.",
    sections: [
      ["Requests", "Submit refund requests within 14 days of purchase. Explain the issue and allow a reasonable opportunity to troubleshoot or recover the license. Your rights under applicable consumer law are not limited by this policy."],
      ["Digital fulfillment", "Refund eligibility may depend on whether a code was delivered, redeemed or substantially used. Duplicate purchases, failed delivery and verified technical incompatibility will be reviewed fairly."],
      ["Effect of a refund", "A full refund revokes the corresponding license record and prevents future recovery from the checkout page. A code already activated offline may not be remotely disabled immediately, but continued use after a refunded purchase is not authorized."],
      ["Processing", "Approved refunds are issued through Polar to the original payment method. Bank and card processing times are outside SampleX's control."],
    ],
  },
  support: {
    eyebrow: "SampleX help",
    title: "Support and license recovery",
    intro: "For purchase, activation or compatibility issues, contact Amir Sholi and include enough information to locate the order—never send card details.",
    sections: [
      ["What to include", "Send the email used at Polar checkout, the checkout or order reference, your Chrome version and a short description of what happened. For activation errors, include the visible error message but do not post your complete license code publicly."],
      ["License recovery", "A paid license is recorded when Polar confirms the order. If you closed the success page before copying the code, support can locate the purchase and reissue or recover the appropriate license."],
      ["Response", "Support requests are handled in good faith, normally within three business days. Complex browser or payment-provider issues may take longer."],
    ],
  },
};

export function SampleXLegal({ page }) {
  const content = pages[page] || pages.privacy;
  return (
    <main className="samplex-legal-page">
      <header className="samplex-legal-header">
        <a href="/samplex" className="samplex-legal-brand"><span>SAMPLEX</span><small>by Amir Sholi</small></a>
        <a href="/samplex"><ArrowLeft size={15} /> Back to SampleX</a>
      </header>
      <article className="samplex-legal-document">
        <div className="samplex-legal-title"><ShieldCheck size={28} /><div><p>{content.eyebrow}</p><h1>{content.title}</h1><span>Last updated {updated}</span></div></div>
        <p className="samplex-legal-intro">{content.intro}</p>
        {content.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
        <aside className="samplex-legal-contact"><Mail size={18} /><div><strong>Questions or requests</strong><a href="mailto:amirsholi999@gmail.com">amirsholi999@gmail.com <ExternalLink size={12} /></a></div></aside>
      </article>
      <footer className="samplex-legal-footer">
        <a href="/samplex/privacy">Privacy</a><a href="/samplex/terms">Terms</a><a href="/samplex/refunds">Refunds</a><a href="/samplex/support">Support</a>
      </footer>
    </main>
  );
}
