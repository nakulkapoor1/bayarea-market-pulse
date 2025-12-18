import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";

// Mock Blog Data
const blogPosts = [
  {
    id: 1,
    title: "Is Buyer Demand Picking Back Up? What Sellers Should Know",
    excerpt: "As we head into the spring market, early indicators suggest a resurgence in buyer activity. Here's what that means for your listing strategy.",
    author: "The Kapoor Group",
    date: "Dec 16, 2025",
    readTime: "5 min read",
    category: "Market Insights",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Impact of New Zoning Laws on Bay Area Home Values",
    excerpt: "Recent legislative changes are set to transform the housing landscape. We break down the potential long-term effects on property values.",
    author: "The Kapoor Group",
    date: "Dec 10, 2025",
    readTime: "7 min read",
    category: "Policy Analysis",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Why 2026 Might Be the Year of the Move-Up Buyer",
    excerpt: "With equity at all-time highs and rates stabilizing, many homeowners are finding this the perfect window to upgrade.",
    author: "The Kapoor Group",
    date: "Dec 05, 2025",
    readTime: "4 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Blog() {
  return (
    <Layout>
      <div className="bg-secondary/30 py-16 border-b border-border">
        <div className="container text-center max-w-3xl">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Expert Analysis</span>
          <h1 className="text-5xl font-display font-bold mb-6">Insights & Perspectives</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Deep dives into the trends shaping the Bay Area real estate market, curated by The Kapoor Group.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Content - Blog Feed */}
          <div className="md:col-span-2 space-y-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer flex flex-col gap-6 border-b border-border pb-12 last:border-0">
                <div className="aspect-[2/1] overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="text-primary font-bold uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm mt-2 group-hover:translate-x-2 transition-transform">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* About The Kapoor Group */}
            <div className="bg-black text-white p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden p-1">
                 <img src="/images/kapoor-logo-v3.png" alt="KG Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">The Kapoor Group</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Your trusted advisors in Bay Area real estate. We provide data-driven strategies for buyers, sellers, and investors.
              </p>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider">
                Contact Us
              </Button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider border-b border-black pb-2">Categories</h4>
              <ul className="space-y-3">
                {["Market Insights", "Policy Analysis", "Strategy", "Neighborhood Spotlights", "Case Studies"].map((cat) => (
                  <li key={cat} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{cat}</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">12</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-secondary/50 p-8">
              <h4 className="font-display font-bold text-lg mb-4">Never Miss an Update</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Join 5,000+ Bay Area residents who get our weekly market breakdown.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white border border-border px-4 py-2 focus:outline-none focus:border-primary"
                />
                <Button className="w-full font-bold uppercase tracking-wider">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
