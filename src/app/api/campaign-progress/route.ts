import { NextResponse } from "next/server";

// Route level revalidation: cache this route response on Vercel edge/CDN for 60 seconds
export const revalidate = 60;

interface RazorpayPayment {
  amount: number;
  status: string;
  notes?: {
    campaign?: string;
  };
}

export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  // Local static/mock data fallback in case Razorpay credentials are not provided
  const fallbackData = {
    "child-education": { raised: 345000, target: 500000 },
    "mobile-health-clinic": { raised: 820000, target: 1200000 },
    "mobile-health": { raised: 820000, target: 1200000 },
    "slum-food-relief": { raised: 285000, target: 300000 },
    "food-relief": { raised: 285000, target: 300000 },
    "assam-flood-aid": { raised: 1140000, target: 1500000 },
    "girls-scholarship": { raised: 180000, target: 400000 },
    "heart-surgery-orphans": { raised: 495000, target: 600000 },
  };

  if (!keyId || !keySecret) {
    return NextResponse.json(fallbackData);
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    
    // Fetch last 100 payments from Razorpay
    const response = await fetch("https://api.razorpay.com/v1/payments?count=100", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Razorpay API responded with status ${response.status}`);
    }

    const data = await response.json();
    const payments: RazorpayPayment[] = data.items || [];

    // Initialize totals with mock fallback baselines (acting as base donations + live ones)
    const totals: Record<string, { raised: number; target: number }> = {
      "child-education": { raised: 345000, target: 500000 },
      "mobile-health-clinic": { raised: 820000, target: 1200000 },
      "mobile-health": { raised: 820000, target: 1200000 },
      "slum-food-relief": { raised: 285000, target: 300000 },
      "food-relief": { raised: 285000, target: 300000 },
      "assam-flood-aid": { raised: 1140000, target: 1500000 },
      "girls-scholarship": { raised: 180000, target: 400000 },
      "heart-surgery-orphans": { raised: 495000, target: 600000 },
    };

    // Aggregate captured payments grouped by notes.campaign
    payments.forEach((payment) => {
      if (payment.status === "captured" && payment.notes?.campaign) {
        const campaignKey = payment.notes.campaign.toLowerCase().trim();
        const amountInRupees = payment.amount / 100; // Razorpay amounts are in paise

        // If the key exists in our registry, increment its raised amount
        if (totals[campaignKey]) {
          totals[campaignKey].raised += amountInRupees;
        } else {
          // Fallback or dynamically track custom campaigns
          totals[campaignKey] = {
            raised: amountInRupees,
            target: 100000, // Default target for untracked campaigns
          };
        }

        // Support aliases (e.g. mobile-health and mobile-health-clinic sync, food-relief and slum-food-relief sync)
        if (campaignKey === "mobile-health" || campaignKey === "mobile-health-clinic") {
          const syncAmount = totals["mobile-health-clinic"].raised + totals["mobile-health"].raised - amountInRupees;
          totals["mobile-health-clinic"].raised = syncAmount + amountInRupees;
          totals["mobile-health"].raised = syncAmount + amountInRupees;
        }
        if (campaignKey === "food-relief" || campaignKey === "slum-food-relief") {
          const syncAmount = totals["slum-food-relief"].raised + totals["food-relief"].raised - amountInRupees;
          totals["slum-food-relief"].raised = syncAmount + amountInRupees;
          totals["food-relief"].raised = syncAmount + amountInRupees;
        }
      }
    });

    return NextResponse.json(totals);
  } catch (error) {
    console.error("Error fetching payment progress from Razorpay:", error);
    // Fall back gracefully to mock progress data if API fails
    return NextResponse.json(fallbackData);
  }
}
