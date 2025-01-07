import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface EnterpriseFormProps {
  onClose: () => void;
}

export function EnterpriseForm({ onClose }: EnterpriseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setTimeout(onClose, 2000);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const content = (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-purple-800 z-[100]">
      {success ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-purple-200 mb-4">תודה רבה!</h3>
            <p className="text-xl text-purple-100">פנייתך התקבלה בהצלחה. ניצור איתך קשר בהקדם.</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col p-4">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-purple-200 hover:text-white transition-colors z-[101]"
            aria-label="סגור"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex-1 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
              <h3 className="text-3xl font-bold text-purple-100 mb-8 text-center">יצירת קשר</h3>
              
              <div>
                <label className="block text-lg text-purple-200 mb-2">
                  איש קשר
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-lg text-purple-200 mb-2">
                  טלפון
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-lg text-purple-200 mb-2">
                  דוא״ל
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-lg text-purple-200 mb-2">
                  כמות משוערת
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-lg text-purple-200 mb-2">
                  הערות נוספות
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-purple-400 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>שולח...</span>
                  </>
                ) : (
                  <span>שליחה</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}