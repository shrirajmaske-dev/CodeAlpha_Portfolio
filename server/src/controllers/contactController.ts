import { Request, Response } from 'express';
import crypto from 'crypto';
import { supabase, isSupabaseConfigured, inMemoryStore } from '../config/supabase.js';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message, honeypot } = req.body;

    // Honeypot bot protection
    if (honeypot && honeypot.trim().length > 0) {
      res.status(400).json({ success: false, error: 'Spam submission detected' });
      return;
    }

    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const ip_hash = crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 32);

    const inquiryPayload = {
      name,
      email,
      subject,
      message,
      ip_hash
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([{ ...inquiryPayload, is_read: false }])
        .select()
        .single();

      if (error) {
        console.warn('Supabase contact submission error, saving locally:', error.message);
        const fallback = await inMemoryStore.createInquiry(inquiryPayload);
        res.status(201).json({
          success: true,
          message: 'Your inquiry has been received. Thank you for reaching out!',
          data: { id: fallback.id }
        });
        return;
      }

      await inMemoryStore.createInquiry(inquiryPayload);
      res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. Thank you for reaching out!',
        data: { id: data.id }
      });
      return;
    }

    const created = await inMemoryStore.createInquiry(inquiryPayload);
    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Thank you for reaching out!',
      data: { id: created.id }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to submit contact message', details: (err as Error).message });
  }
};

export const getInquiries = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase getInquiries error, using local:', error.message);
        const fallback = await inMemoryStore.getInquiries();
        res.status(200).json({ success: true, data: fallback });
        return;
      }
      res.status(200).json({ success: true, data });
      return;
    }

    const inquiries = await inMemoryStore.getInquiries();
    res.status(200).json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve inquiries', details: (err as Error).message });
  }
};

export const markInquiryRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { is_read = true } = req.body;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .update({ is_read })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.markInquiryRead(id, is_read);
      res.status(200).json({ success: true, data });
      return;
    }

    const updated = await inMemoryStore.markInquiryRead(id, is_read);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Inquiry not found' });
      return;
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update inquiry status', details: (err as Error).message });
  }
};

export const deleteInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
      if (error) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      await inMemoryStore.deleteInquiry(id);
      res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
      return;
    }

    const deleted = await inMemoryStore.deleteInquiry(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Inquiry not found for deletion' });
      return;
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete inquiry', details: (err as Error).message });
  }
};
