import { NextResponse } from 'next/server';
import db from '@/lib/db';
import nodemailer from 'nodemailer';

const PLANS = [
  { name: 'Essential', speed: 30,  price: 500  },
  { name: 'Connected', speed: 50,  price: 700  },
  { name: 'Momentum',  speed: 75,  price: 900  },
  { name: 'Limitless', speed: 100, price: 1100 },
  { name: 'Ultra',     speed: 150, price: 1500 },
  { name: 'Giga',      speed: 200, price: 2000 },
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { plan, connectionType, fullName, phone, email, address } = body;

    if (!plan || !fullName || !phone || !address) {
      return NextResponse.json(
        { success: false, message: 'Plan, name, phone and address are required.' },
        { status: 400 }
      );
    }

    const planData = PLANS.find(p => p.name === plan);

    // Save to MySQL via Prisma
    const order = await db.order.create({
      data: {
        plan,
        speed: planData?.speed ?? null,
        price: planData?.price ?? null,
        connectionType: connectionType || 'New connection',
        fullName,
        phone,
        email: email || null,
        address,
      },
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
          subject: `New Order — ${fullName} (${plan})`,
          html: `<h2>New Connection Request</h2>
            <p><b>Customer:</b> ${fullName}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Email:</b> ${email || 'N/A'}</p>
            <p><b>Plan:</b> ${plan} — ${planData?.speed}Mbps / ৳${planData?.price}</p>
            <p><b>Type:</b> ${connectionType}</p>
            <p><b>Address:</b> ${address}</p>`,
        });
      } catch (e) {
        console.warn('Email send failed:', e.message);
      }
    }

    return NextResponse.json(
      { success: true, message: 'আপনার সংযোগের অনুরোধ পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।', orderId: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json(
      { success: false, message: 'কিছু একটা সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}

// Admin: list all orders
export async function GET(request) {
  const token = request.headers.get('x-admin-token');
  if (token !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success: true, orders });
}

// Admin: update order status
export async function PATCH(request) {
  const token = request.headers.get('x-admin-token');
  if (token !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id, status, notes } = await request.json();
  const updated = await db.order.update({
    where: { id: parseInt(id) },
    data: { status, notes },
  });
  return NextResponse.json({ success: true, order: updated });
}
