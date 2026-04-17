"use client";

import { useState } from "react";
import { Download, X, Loader2, CheckCircle2 } from "lucide-react";

interface DownloadFormButtonProps {
  ratgeberTitle: string;
  downloadUrl: string;
  pages: number;
}

export default function DownloadFormButton({
  ratgeberTitle,
  downloadUrl,
  pages,
}: DownloadFormButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nameParts = form.name.trim().split(/\s+/);
    const vorname = nameParts[0] || "";
    const nachname = nameParts.slice(1).join(" ") || vorname;

    try {
      const netlifyBody = new URLSearchParams({
        "form-name": "download",
        vorname,
        nachname,
        email: form.email,
        telefon: form.phone,
        ratgeber: ratgeberTitle,
      });

      const netlifyPromise = fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyBody.toString(),
      });

      const propstackPromise = fetch("/.netlify/functions/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vorname,
          nachname,
          email: form.email,
          telefon: form.phone,
          nachricht: `Download: ${ratgeberTitle}`,
          ratgeber: ratgeberTitle,
          formType: "download",
        }),
      });

      await Promise.all([
        netlifyPromise,
        propstackPromise.catch((err) => console.warn("Propstack submission failed:", err)),
      ]);
    } catch (err) {
      console.warn("Form submission failed:", err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      window.open(downloadUrl, "_blank");
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setForm({ name: "", email: "", phone: "" });
      }, 1500);
    }, 1000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-btn hover:bg-primary-800 transition-colors shadow-btn text-base"
      >
        <Download size={18} />
        Ratgeber herunterladen ({pages} Seiten)
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsOpen(false)}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
            <button
              type="button"
              onClick={() => !isSubmitting && setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Vielen Dank!
                </h3>
                <p className="text-gray-600">
                  Ihr Download startet automatisch...
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Ratgeber herunterladen
                  </h3>
                  <p className="text-sm text-gray-600">
                    Füllen Sie das Formular aus, um den Ratgeber{" "}
                    <span className="font-semibold">&bdquo;{ratgeberTitle}&ldquo;</span>{" "}
                    kostenlos herunterzuladen.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="dl-name-mid"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name *
                    </label>
                    <input
                      id="dl-name-mid"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Vor- und Nachname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dl-email-mid"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      E-Mail *
                    </label>
                    <input
                      id="dl-email-mid"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="ihre@email.de"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dl-phone-mid"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefonnummer *
                    </label>
                    <input
                      id="dl-phone-mid"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+49 123 456789"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-btn hover:bg-primary-800 transition-colors shadow-btn text-base disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Wird verarbeitet...
                      </>
                    ) : (
                      <>
                        <Download size={18} />
                        Jetzt herunterladen
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    Mit dem Absenden stimmen Sie unserer{" "}
                    <a href="/datenschutz" className="underline hover:text-primary">
                      Datenschutzerklärung
                    </a>{" "}
                    zu.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
