import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteContent from '@/models/SiteContent';
import { verifyAdmin } from '@/lib/auth';

const defaultContent = {
  key: 'homepage',
  hero: {
    tagline: 'Small Acts, Big Impact.',
    headline: 'Empowering India\'s Slums.',
    description: 'We run direct diagnostics mobile clinics, sponsor higher education scholarships for slum girls, and serve nutritious food kitchens. 100% of your funds reach the beneficiaries.',
    bannerImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80',
  },
  impactStats: { livesImpacted: 15200, activeDrives: 50, transparency: 100, fundsDeployed: 45 },
  trustPillars: [
    { title: '80G & 12A Certified', description: 'All donations made to SewaPrith are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act. Dynamic receipts are auto-generated instantly.' },
    { title: '0% Admin Fee Leak', description: 'Our founders fund all administrative, office setup, website domain, and Vercel hosting charges out of their pockets. 100% of public money directly purchases medicines or food.' },
    { title: 'Direct Ground Reports', description: 'We believe in proof. We share geotagged photos, hospital diagnosis summaries, patient bills, and receipt vouchers directly with respective donors via custom updates.' }
  ],
  instagramPosts: [],
  socialMediaFeeds: [],
  announcement: {
    enabled: false,
    message: 'Medical camp scheduled this Sunday at Lucknow slum.',
    link: '/campaigns',
    type: 'info',
  }
};

export async function GET() {
  try {
    await dbConnect();
    let content = await SiteContent.findOne({ key: 'homepage' });

    if (!content) {
      try {
        content = await SiteContent.create(defaultContent);
      } catch (err) {
        console.error('Failed to create default content, using fallback:', err);
        content = defaultContent;
      }
    }

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ success: true, data: defaultContent });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    const updatedContent = await SiteContent.findOneAndUpdate(
      { key: 'homepage' },
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedContent);
  } catch (error: any) {
    console.error("Save Content Error Details:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update" },
      { status: 500 }
    );
  }
}
