export interface Campaign {
  id: string;
  title: string;
  category: "Education" | "Healthcare" | "Food Relief" | "Emergency Aid";
  goal: number;
  raised: number;
  image: string;
  excerpt: string;
  story: string;
  donorCount: number;
  daysLeft: number;
}

export const campaigns: Campaign[] = [
  {
    id: "child-education",
    title: "Empower a Child's Future: Mission Education",
    category: "Education",
    goal: 500000,
    raised: 345000,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Sponsor educational kits, school fees, and evening digital tuition classes for 200 children living in Delhi's urban slums.",
    story: "Education is the single most powerful tool to break the cycle of intergenerational poverty. In urban slum clusters, child dropouts have increased by 30% due to digital divide and financial hardships. Mission Education supports these children with standard syllabus textbooks, tuition bags, laptops in digital learning labs, and school uniforms. Your small contribution ensures a kid stays in school and builds a brighter tomorrow.",
    donorCount: 142,
    daysLeft: 15,
  },
  {
    id: "mobile-health-clinic",
    title: "Mobile Health Clinic Setup: Rural Outreach",
    category: "Healthcare",
    goal: 1200000,
    raised: 820000,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    excerpt: "Launch a medical check-up van equipped with diagnostics, standard medicines, and first-aid kits for 45 remote villages.",
    story: "Rural communities often travel over 50 kilometers for primary medical checkups. This clinic-on-wheels project will bring professional doctors, general diagnostics equipment, glucose monitoring, ECG machines, and free prescription medicines directly to their doorstep. By covering remote villages, we aim to detect chronic illnesses early and provide preventive healthcare consultations.",
    donorCount: 288,
    daysLeft: 22,
  },
  {
    id: "slum-food-relief",
    title: "Feed the Hungry: Daily Nutritional Meals",
    category: "Food Relief",
    goal: 300000,
    raised: 285000,
    image: "/food-relief.png",
    excerpt: "Providing fresh, warm, hygienic, nutritious cooked meals to street children and daily wage labourers.",
    story: "Millions suffer from daily malnutrition and hunger. SewaPrith runs a daily community kitchen that prepares fresh, hot meals consisting of rice, lentils, vegetables, and clean water. We serve them to construction workers, rikshaw pullers, street-dwelling children, and abandoned elderly people in temporary shelter hubs. Every ₹50 feeds a person a complete, balanced meal.",
    donorCount: 341,
    daysLeft: 8,
  },
  {
    id: "assam-flood-aid",
    title: "Emergency Aid: Assam Flood Relief Drive",
    category: "Emergency Aid",
    goal: 1500000,
    raised: 1140000,
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
    excerpt: "Distributing water purification tablets, dry rations, hygiene products, and sleeping mats to flood-affected families.",
    story: "The recent flash floods have submerged thousands of homes, leaving families displaced without clean drinking water or basic sanitation. Our rapid response ground team is actively distributing dry food kits (pulses, flat rice, salt, jaggery), chlorine tablets to prevent water-borne epidemics, tarpaulin tents, and medical aid kits. Immediate support is critical to saving lives.",
    donorCount: 512,
    daysLeft: 5,
  },
  {
    id: "girls-scholarship",
    title: "Shiksha: Higher Education Scholarships for Girls",
    category: "Education",
    goal: 400000,
    raised: 180000,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    excerpt: "Help 50 deserving girls from low-income families pursue undergraduate degrees and professional vocational courses.",
    story: "Many bright young girls are forced to drop out after secondary education due to financial constraints and family expectations. The Shiksha Scholarship covers college admission fees, transit passes, reference library access, and computer classes, enabling these young women to break barriers and become financially self-reliant.",
    donorCount: 92,
    daysLeft: 30,
  },
  {
    id: "heart-surgery-orphans",
    title: "Lifeline: Critical Surgeries for Vulnerable Children",
    category: "Healthcare",
    goal: 600000,
    raised: 495000,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    excerpt: "Funding cardiac operations, post-op care, and life-saving hospitalizations for children with congenital defects.",
    story: "Underprivileged children with congenital heart conditions are left untreated because surgeries are prohibitively expensive. We collaborate with pediatric cardiologists and partner super-specialty hospitals to sponsor operations for orphanages and low-income families. Your donation directly funds operating theatre costs and crucial recovery ward care.",
    donorCount: 167,
    daysLeft: 12,
  }
];
