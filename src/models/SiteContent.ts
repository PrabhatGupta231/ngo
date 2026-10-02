import mongoose from 'mongoose';

const TrustPillarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const InstagramPostSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image: { type: String, required: true },
  likes: { type: String, required: true },
  comments: { type: Number, required: true },
});

const SocialMediaFeedSchema = new mongoose.Schema({
  id: { type: String, required: true },
  platform: { type: String, required: true, enum: ['youtube', 'instagram', 'facebook'] },
  url: { type: String, required: true },
  caption: { type: String },
  active: { type: Boolean, default: true },
});

const AnnouncementSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  message: { type: String, default: '' },
  link: { type: String, default: '' },
  type: { type: String, enum: ['info', 'urgent', 'success'], default: 'info' },
});

const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'homepage' },
    hero: {
      tagline: { type: String, default: 'Small Acts, Big Impact.' },
      headline: { type: String, default: 'Empowering India\'s Slums.' },
      description: {
        type: String,
        default:
          'We run direct diagnostics mobile clinics, sponsor higher education scholarships for slum girls, and serve nutritious food kitchens. 100% of your funds reach the beneficiaries.',
      },
      bannerImage: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80',
      },
    },
    impactStats: {
      livesImpacted: { type: Number, default: 15200 },
      activeDrives: { type: Number, default: 50 },
      transparency: { type: Number, default: 100 },
      fundsDeployed: { type: Number, default: 45 },
    },
    trustPillars: {
      type: [TrustPillarSchema],
      default: [
        {
          title: '80G & 12A Certified',
          description:
            'All donations made to SewaPrith are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act. Dynamic receipts are auto-generated instantly.',
        },
        {
          title: '0% Admin Fee Leak',
          description:
            'Our founders fund all administrative, office setup, website domain, and Vercel hosting charges out of their pockets. 100% of public money directly purchases medicines or food.',
        },
        {
          title: 'Direct Ground Reports',
          description:
            'We believe in proof. We share geotagged photos, hospital diagnosis summaries, patient bills, and receipt vouchers directly with respective donors via custom updates.',
        },
      ],
    },
    instagramPosts: {
      type: [InstagramPostSchema],
      default: [],
    },
    socialMediaFeeds: [
      {
        id: { type: String, required: true },
        platform: { type: String, default: "instagram" },
        url: { type: String, required: true },
        caption: { type: String, default: "" },
        active: { type: Boolean, default: true }
      }
    ],
    announcement: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: "" },
      link: { type: String, default: "" },
      type: { type: String, default: "info" }
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent ||
  mongoose.model('SiteContent', SiteContentSchema);
