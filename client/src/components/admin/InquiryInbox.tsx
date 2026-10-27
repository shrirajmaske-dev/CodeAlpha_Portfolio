import React, { useState } from 'react';
import { Mail, Trash2, Eye, X, MessageSquare } from 'lucide-react';
import { ContactInquiry } from '../../types/index.js';
import { adminMarkInquiryRead, adminDeleteInquiry } from '../../lib/api.js';
import { Button } from '../common/Button.js';

interface InquiryInboxProps {
  inquiries: ContactInquiry[];
  onRefresh: () => void;
}

export const InquiryInbox: React.FC<InquiryInboxProps> = ({
  inquiries,
  onRefresh
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  const handleToggleRead = async (inquiry: ContactInquiry) => {
    try {
      await adminMarkInquiryRead(inquiry.id, !inquiry.is_read);
      onRefresh();
    } catch (err) {
      alert(`Failed to update status: ${(err as Error).message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await adminDeleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      onRefresh();
    } catch (err) {
      alert(`Delete failed: ${(err as Error).message}`);
    }
  };

  const handleOpenDetail = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.is_read) {
      adminMarkInquiryRead(inquiry.id, true).then(() => onRefresh());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Contact Submissions Inbox</h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Inbound messages from visitors, hiring teams, and advisory inquiries.
        </p>
      </div>

      {/* Messages Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 text-sm">
            <Mail className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            No inquiries currently in the inbox.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
              <thead className="bg-zinc-900/80 text-[11px] font-mono uppercase tracking-wider text-zinc-400 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Sender</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {inquiries.map(inq => (
                  <tr
                    key={inq.id}
                    className={`hover:bg-white/[0.03] transition-colors ${
                      !inq.is_read ? 'bg-white/[0.04] font-medium' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleRead(inq)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          inq.is_read
                            ? 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/5'
                            : 'bg-white text-black font-bold shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        }`}
                        title="Click to toggle read status"
                      >
                        {inq.is_read ? 'Read' : 'New / Unread'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white font-semibold">{inq.name}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{inq.email}</div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      <span className="text-zinc-200">{inq.subject}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-zinc-400 text-xs whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString()} {new Date(inq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(inq)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedInquiry(null)} />
          <div className="relative w-full max-w-xl bg-[#08080a] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 text-zinc-200 z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="text-lg font-bold text-white tracking-tight">Inquiry Details</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-zinc-400 font-mono text-xs border-b border-white/10 pb-2">
                <span>Received: {new Date(selectedInquiry.created_at).toLocaleString()}</span>
                {selectedInquiry.ip_hash && (
                  <span>IP Hash: {selectedInquiry.ip_hash.substring(0, 8)}...</span>
                )}
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">From:</span>
                <span className="text-base font-bold text-white">{selectedInquiry.name}</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="block text-zinc-200 hover:text-white underline font-mono text-xs mt-0.5 transition-colors"
                >
                  {selectedInquiry.email}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">Subject:</span>
                <span className="font-semibold text-white">{selectedInquiry.subject}</span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">Message Content:</span>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs border border-white shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-colors"
              >
                <Mail className="w-4 h-4" /> Reply via Email Client
              </a>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
