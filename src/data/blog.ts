export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown formatted string
  date: string;
  readTime: string;
  image: string;
  author: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sewaprith-impact-report-q2-2026",
    title: "SewaPrith Quarter 2 Financial & Ground Impact Transparency Report",
    excerpt: "Detailing exactly how every rupee donated in Q2 2026 was spent, auditing medical relief bills, and tracking slum outreach statistics.",
    content: `## Transparency is Our Commitment

At SewaPrith Foundation, we believe that non-profits must maintain the highest standards of financial transparency. This report details our collections, administrative costs (which remain at **0%** as all admin expenses are funded by founder endowments), and direct program allocations from April 1 to June 30, 2026.

### Key Performance Highlights:
- **Total Funds Disbursed**: ₹18,45,200
- **Total Beneficiaries Reached**: 8,240 individuals
- **Program efficiency**: 100% of public donations went directly to field operations.

### Program Breakdown
1. **Slum Food Kitchens**: Served **14,500 hot meals** across 4 clusters in Delhi-NCR (₹7,25,000 spent).
2. **Mobile Health Camps**: Diagnosed and treated **2,300 villagers** in Uttarakhand and Haryana (₹6,12,000 spent).
3. **Slum School Support**: Provided **350 digital educational kits** to child students (₹5,08,200 spent).

### Audit Reports & Receipts
We have attached the audited balances and GST invoice records of raw grains purchases, medical supplies, and tablets below for public downloading on our [About Page](/about).`,
    date: "July 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    author: "Arjun Mehta (Founder)",
    tags: ["Transparency", "Impact", "Financials"],
  },
  {
    slug: "digital-education-revolution-in-slums",
    title: "Bridging the Digital Divide: Slum Digital Learning Centers Open",
    excerpt: "How SewaPrith set up 3 new low-cost computer centers equipped with open-source learning tools for children in Sanjay Colony.",
    content: `## Opening Windows to the Digital World

In today's age, computer literacy is as vital as reading or writing. However, for children residing in urban resettlement colonies, a laptop or a home internet connection is a distant luxury.

### Project Launch
In June, SewaPrith launched **three digital classrooms** in Sanjay Colony, Delhi. Each center features:
- **10 refurbished desktop computers** running lightweight educational OS.
- **High-speed Wi-Fi** powered by local community hubs.
- **Daily 2-hour digital basic classes** led by volunteer tutors.

### Real Impact Stories
Riya, a 13-year-old student, shares: *"I had never touched a computer keyboard before. Now, I am learning basic typing, drawing, and doing search queries for my school assignments. I want to become a software engineer."*

Our goal is to reach 1,000 students by the end of 2026. You can support this initiative under our [Campaigns page](/campaigns).`,
    date: "June 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    author: "Pooja Sharma (Education Lead)",
    tags: ["Education", "Digital Literacy", "Slum Kids"],
  },
  {
    slug: "emergency-healthcare-camp-haryana-villages",
    title: "Providing Primary Care at the Doorstep: Haryana Camps",
    excerpt: "Over 800 villagers diagnosed, given free prescription drugs, and referred for critical operations during our weekly health camps.",
    content: `## Healthcare is a Basic Right

Many rural villages suffer from a complete lack of qualified medical practitioners, forcing residents to consult unauthorized quacks or neglect their diseases until they reach life-threatening stages.

### CAMP SCOPE
SewaPrith partnered with Max Healthcare doctors to conduct 5 multi-specialty health camps in Rewari District, Haryana.

Our diagnostics cover:
- High blood pressure & diabetes screening
- Pediatric general growth evaluation
- Cataract detection
- Free distribution of antibiotics, iron supplements, and pain relief.

### Critical Care Referrals
Out of 840 patients examined, we detected 14 severe heart blockages and 32 advanced cataracts. SewaPrith is fully sponsoring these procedures at our partner hospitals in Gurugram, ensuring they pay ₹0.`,
    date: "June 12, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1504813184591-015556c5c522?auto=format&fit=crop&w=800&q=80",
    author: "Dr. Vikram Sen (Medical Coordinator)",
    tags: ["Healthcare", "Rural Camp", "Free Medicine"],
  }
];
