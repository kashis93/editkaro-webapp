import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Video } from 'lucide-react';
import { playSuccessChime, playWoosh } from '../utils/audio';

export const BookingModal = ({
  isOpen,
  onClose,
  prefilledTopic = '',
  prefilledDetails = '',
  prefilledProjectTitle = ''
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [videoType, setVideoType] = useState('Short-Form Reels / TikTok / Shorts');
  const [rawFootageUrl, setRawFootageUrl] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    if (prefilledDetails || prefilledTopic || prefilledProjectTitle) {
      setDetails(`Reference / Topic: ${prefilledTopic || prefilledProjectTitle}\n\nNotes:\n${prefilledDetails}`);
    }
  }, [prefilledTopic, prefilledDetails, prefilledProjectTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          videoType,
          budget: '$200 - $500',
          details: `Footage Link: ${rawFootageUrl}\n${details}`
        })
      });

      const data = await res.json();
      setRequestId(data.requestId || 'EK-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);

      // Trigger Celebration Confetti
      playSuccessChime();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setRequestId('EK-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 flex min-h-full items-center justify-center animate-fadeIn">
      
      {/* Background click */}
      <div className="fixed inset-0" onClick={() => { playWoosh(); onClose(); }} />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-[#FFFDF9] border border-[#E8E0D5] p-5 sm:p-8 shadow-2xl my-auto text-[#1C140E] max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={() => { playWoosh(); onClose(); }}
          className="sticky top-0 float-right z-20 p-2 -mr-2 -mt-2 rounded-full bg-[#F5F0EB] text-[#786A5C] hover:text-[#1C140E] hover:bg-[#E8E0D5] transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="clear-both">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-[#E05638]/10 text-[#E05638] border border-[#E05638]/20">
                <Video className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold text-[#E05638] uppercase">EDITKARO.IN REQUEST</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C140E]">Book Free Sample Video Edit</h3>
            <p className="text-xs text-[#786A5C] mt-1 mb-5 font-medium leading-relaxed">
              Send us a link to your raw footage or video concept. Our chief editors will edit a 30-second free sample for you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-[#1C140E] block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full p-3 bg-[#F5F0EB] border border-[#E8E0D5] rounded-xl text-xs text-[#1C140E] focus:outline-none focus:border-[#E05638] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#1C140E] block mb-1">Email / WhatsApp *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@creator.com"
                  className="w-full p-3 bg-[#F5F0EB] border border-[#E8E0D5] rounded-xl text-xs text-[#1C140E] focus:outline-none focus:border-[#E05638] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#1C140E] block mb-1">Editing Category</label>
                <select
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value)}
                  className="w-full p-3 bg-[#F5F0EB] border border-[#E8E0D5] rounded-xl text-xs text-[#1C140E] focus:outline-none focus:border-[#E05638] font-medium"
                >
                  <option value="Short-Form Reels / TikTok / Shorts">Short-Form Reels / TikTok / Shorts</option>
                  <option value="YouTube Long-Form Video">YouTube Long-Form Video</option>
                  <option value="Gaming & Esports Montage">Gaming & Esports Montage</option>
                  <option value="Football & Sports Highlight">Football & Sports Highlight</option>
                  <option value="eCommerce UGC Product Ad">eCommerce UGC Product Ad</option>
                  <option value="Anime AMV Beat-Sync">Anime AMV Beat-Sync</option>
                  <option value="Vox Documentary Style">Vox Documentary Style</option>
                  <option value="Color Grading & Sound Design">Color Grading & Sound Design</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#1C140E] block mb-1">Google Drive / Dropbox Raw Footage Link (Optional)</label>
                <input
                  type="url"
                  value={rawFootageUrl}
                  onChange={(e) => setRawFootageUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full p-3 bg-[#F5F0EB] border border-[#E8E0D5] rounded-xl text-xs text-[#1C140E] focus:outline-none focus:border-[#E05638] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#1C140E] block mb-1">Editing Instructions & Goals</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe your desired pacing, reference videos, captions style, sound design..."
                  className="w-full p-3 bg-[#F5F0EB] border border-[#E8E0D5] rounded-xl text-xs text-[#1C140E] focus:outline-none focus:border-[#E05638] resize-none font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-full bg-[#E05638] hover:bg-[#C84326] text-white font-extrabold text-xs tracking-wide shadow-md shadow-[#E05638]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Submitting to Editkaro...' : 'Request Free Sample Edit'}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#1C140E]">Sample Request Received!</h3>
            <p className="text-xs text-[#786A5C] max-w-sm mx-auto font-medium">
              Thank you, <strong className="text-[#E05638]">{name}</strong>! Your request has been assigned ID: <span className="font-mono text-emerald-600 font-bold">{requestId}</span>.
            </p>
            <p className="text-xs text-[#786A5C]">
              Our chief editor will review your requirements and respond to <span className="text-[#1C140E] font-bold">{email}</span> within 2 hours.
            </p>

            <button
              onClick={() => { playWoosh(); onClose(); }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#1C140E] hover:bg-[#3D3025] text-white font-bold text-xs"
            >
              Back to Portfolio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
