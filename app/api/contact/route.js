import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, phone and message are required.' },
        { status: 400 }
      );
    }

    // Save to MySQL via Prisma
    const contact = await db.contact.create({
      data: { name, phone, email: email || null, message },
    });

    // Email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Contact — ${name}`,
          html: `<h2>New Contact</h2><p><b>Name:</b> ${name}</p><p><b>Phone:</b> ${phone}</p><p><b>Email:</b> ${email || 'N/A'}</p><p><b>Message:</b> ${message}</p>`,
        });
      } catch (e) {
        console.warn('Email send failed:', e.message);
      }
    }

    return NextResponse.json(
      { success: true, message: 'আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json(
      { success: false, message: 'কিছু একটা সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}

// Admin: list all contacts
export async function GET(request) {
  const token = request.headers.get('x-admin-token');
  if (token !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const contacts = await db.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success: true, contacts });
}
