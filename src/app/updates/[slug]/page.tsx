import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Heart } from "lucide-react";
import { blogPosts } from "@/data/blog";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

// Custom simple parser to render Markdown lines into nice JSX components
function parseInlineMarkdown(text: string) {
  // Regex to match bold parts **text**
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-extrabold text-secondary">
        {match[1]}
      </strong>
    );
    lastIndex = boldRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function renderMarkdownToJSX(content: string) {
  const lines = content.split("\n");
  const elements: React.JSX.Element[] = [];
  let inList = false;
  let listItems: React.JSX.Element[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(
        <li key={`li-${idx}`} className="text-slate-600 leading-relaxed mb-1.5 list-disc ml-5">
          {parseInlineMarkdown(trimmed.replace("- ", ""))}
        </li>
      );
      return;
    }

    if (inList && !trimmed.startsWith("- ")) {
      elements.push(
        <ul key={`ul-${idx}`} className="space-y-1 mb-4">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={idx} className="text-xl md:text-2xl font-extrabold text-secondary mt-8 mb-4 tracking-tight">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={idx} className="text-lg md:text-xl font-extrabold text-secondary mt-6 mb-3 tracking-tight">
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed === "") {
      elements.push(<div key={idx} className="h-4" />);
    } else {
      elements.push(
        <p key={idx} className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  });

  // Flush remaining list items if text ends on list
  if (inList && listItems.length > 0) {
    elements.push(
      <ul key="ul-end" className="space-y-1 mb-4">
        {listItems}
      </ul>
    );
  }

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50/40 pb-20">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-12 md:py-16 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/updates"
            className="inline-flex items-center text-xs font-bold text-primary-light hover:underline gap-1 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Updates
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-xs text-slate-400 mt-6 font-semibold items-center">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-light" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-light" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary-light" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* Main Post Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Area */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm lg:col-span-2 space-y-6">
          {/* Post cover photo */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Render parsed contents */}
          <div className="pt-2 font-medium">
            {renderMarkdownToJSX(post.content)}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6 lg:col-span-1">
          {/* Donation CTA */}
          <div className="bg-gradient-to-br from-primary to-primary-hover text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary-light">Support Our Work</h4>
              <h3 className="font-extrabold text-base leading-snug">Help fund active ground programs directly.</h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              SewaPrith matches donor contributions directly with pharmaceutical buys and school kits. Save tax under Section 80G.
            </p>
            <Link
              href="/donate"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-primary bg-white hover:bg-slate-50 transition-colors"
            >
              Donate Online
            </Link>
          </div>

          {/* Tags list */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-3">
            <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Article Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
