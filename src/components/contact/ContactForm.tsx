import React, { useState, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  phone: '',
  email: '',
  message: ''
};

export function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.send(
        'service_b6ms6rj', // Replace with your EmailJS service ID
        'template_gdisvzc', // Replace with your EmailJS template ID
        {
          to_email: 'anatrozenstein@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        'a2WIvgO5Vtf7WN-yJ' // Replace with your EmailJS public key
      );

      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      setError('אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר.');
      console.error('EmailJS error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                  שם מלא
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-lg text-purple-200 mb-2">
                  הודעה
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center">
                  {error}
                </div>
              )}

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