import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, TrendingDown, Minus, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  trend: string;
  category: string;
  image?: string;
  timestamp?: string;
}

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />;
  return <Minus className="h-4 w-4 text-gray-400" />;
};

export default function Home() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => res.json())
      .then(data => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-display font-bold uppercase tracking-widest">Loading Market Pulse...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="San Francisco Skyline" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        
        <div className="container relative z-10 pb-16 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Daily Digest</span>
              <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {today}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              The Pulse of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Bay Area Real Estate</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
              Your curated daily briefing on the trends, data, and stories shaping the market.
            </p>
          </div>
        </div>
      </section>

      {/* Market Ticker */}
      <div className="bg-primary text-white py-3 overflow-hidden whitespace-nowrap">
        <div className="container flex items-center gap-8 text-sm font-bold tracking-wider animate-marquee">
          <span className="flex items-center gap-2">SANTA CLARA MEDIAN: $1.95M <TrendingUp className="h-4 w-4"/></span>
          <span className="opacity-50">|</span>
          <span className="flex items-center gap-2">SAN MATEO MEDIAN: $2.1M <TrendingUp className="h-4 w-4"/></span>
          <span className="opacity-50">|</span>
          <span className="flex items-center gap-2">ALAMEDA MEDIAN: $1.25M <TrendingUp className="h-4 w-4"/></span>
          <span className="opacity-50">|</span>
          <span className="flex items-center gap-2">SILICON VALLEY INV: -12% <TrendingDown className="h-4 w-4"/></span>
          <span className="opacity-50">|</span>
          <span className="flex items-center gap-2">EAST BAY DOM: 18 DAYS <TrendingDown className="h-4 w-4"/></span>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column: The Daily 10 */}
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-10 border-b border-black pb-4">
                <h2 className="text-4xl font-display font-bold text-foreground">The Daily 10</h2>
                <span className="text-muted-foreground font-medium">Top stories for today</span>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Featured Story (Item 1) */}
                {newsItems.length > 0 && (
                  <div className="group cursor-pointer">
                    <div className="relative aspect-video overflow-hidden mb-4">
                      <img 
                        src={newsItems[0].image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"} 
                        alt={newsItems[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                        #1 Trending
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold uppercase tracking-wider">{newsItems[0].category}</span>
                      <span>•</span>
                      <span>{newsItems[0].source}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Today</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                      {newsItems[0].title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      {newsItems[0].summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                      Read Full Story <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                )}

                <div className="w-full h-px bg-border my-4" />

                {/* Remaining Stories (2-10) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {newsItems.slice(1).map((item, index) => (
                    <div key={item.id} className="group cursor-pointer flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl font-display font-bold text-gray-200 group-hover:text-primary/20 transition-colors">
                          {(index + 2).toString().padStart(2, '0')}
                        </span>
                        <div className="bg-secondary px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                          Market Impact <TrendIcon trend={item.trend} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground uppercase tracking-wider">
                        <span className="text-primary font-bold">{item.category}</span>
                        <span>•</span>
                        <span>{item.source}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                        {item.summary}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider mt-auto">
                        Read More <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar / Market Data */}
            <div className="w-full md:w-[350px] flex flex-col gap-8">
              
              {/* Subscribe Widget */}
              <Card className="bg-primary text-white border-none rounded-none">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Stay Ahead</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-white/90">Get the daily top 10 delivered straight to your inbox every morning.</p>
                  <div className="flex flex-col gap-3">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="bg-white/10 border border-white/30 text-white placeholder:text-white/60 px-4 py-2 focus:outline-none focus:border-white"
                    />
                    <Button variant="secondary" className="w-full rounded-none font-bold uppercase tracking-wider bg-white text-primary hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Market Pulse Widget */}
              <div className="border border-border p-6 bg-secondary/30">
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> Market Pulse
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Santa Clara Inventory</span>
                      <span className="font-bold text-red-600">-12% YoY</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200">
                      <div className="h-full bg-red-500 w-[40%]" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">San Mateo Median</span>
                      <span className="font-bold text-primary">$2.1M</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200">
                      <div className="h-full bg-primary w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Alameda Demand</span>
                      <span className="font-bold text-green-600">High</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200">
                      <div className="h-full bg-green-500 w-[75%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/market-data">
                    <Button variant="outline" className="w-full rounded-none border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-wider">
                      View Full Report
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Featured Insight */}
              <div className="relative aspect-[3/4] bg-black text-white p-6 flex flex-col justify-end overflow-hidden group cursor-pointer">
                <img 
                  src="/images/market-abstract.png" 
                  alt="Abstract" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="relative z-10">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-widest mb-3 inline-block">
                    Deep Dive
                  </span>
                  <h3 className="font-display font-bold text-2xl mb-2 leading-tight">
                    Is Buyer Demand Picking Back Up?
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    What sellers need to know about the shifting dynamics in the spring market.
                  </p>
                  <span className="text-sm font-bold uppercase tracking-wider border-b border-white pb-1 inline-block">
                    Read Analysis
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
