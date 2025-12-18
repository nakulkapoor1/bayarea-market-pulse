import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Download, TrendingUp, MapPin, BarChart3 } from "lucide-react";
import SubscriptionForm from "@/components/SubscriptionForm";

export default function MarketData() {
  return (
    <Layout>
      <div className="bg-black text-white py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Data Center</span>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">How's the Market?</h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Real-time data and comprehensive reports to help you make informed decisions. Updated weekly.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider gap-2">
                <Download className="h-4 w-4" /> Download PDF Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Santa Clara Median", value: "$1.95M", change: "+5.2%", trend: "up" },
            { label: "San Mateo Median", value: "$2.1M", change: "+3.8%", trend: "up" },
            { label: "Alameda Median", value: "$1.25M", change: "+1.5%", trend: "up" },
            { label: "Silicon Valley Inv", value: "840", change: "-12%", trend: "down" }
          ].map((metric, i) => (
            <Card key={i} className="border-border bg-secondary/20">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-display font-bold">{metric.value}</span>
                  <span className={`flex items-center gap-1 text-sm font-bold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 rotate-180" />}
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Chart Area - Altos Research Integration */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-display font-bold">Market Trends</h2>
              <Tabs defaultValue="price" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="price">Price</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="demand">Demand</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Altos Research Embed */}
            <div className="aspect-[16/9] bg-white border border-border relative overflow-hidden group">
              <iframe 
                src="https://altos.re/s/52b6931a" 
                className="w-full h-full border-0"
                title="Altos Research Market Data"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-xs text-center text-muted-foreground border-t border-border">
                Data provided by Altos Research
              </div>
            </div>

            <div className="prose max-w-none text-muted-foreground">
              <p>
                The charts above reflect real-time market conditions for the Bay Area. 
                We are seeing a distinct divergence between single-family homes in prime Silicon Valley neighborhoods 
                versus the condo market in the East Bay. Inventory constraints continue to drive prices upward in Santa Clara County.
              </p>
            </div>
          </div>

          {/* Sidebar - Google Forms Integration */}
          <div className="space-y-8">
            {/* Local Markets List */}
            <div>
              <h3 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" /> Local Markets
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Palo Alto", price: "$3.4M", status: "Very Hot" },
                  { name: "Mountain View", price: "$2.1M", status: "Hot" },
                  { name: "Sunnyvale", price: "$1.9M", status: "Very Hot" },
                  { name: "San Mateo", price: "$1.8M", status: "Hot" },
                  { name: "Redwood City", price: "$1.7M", status: "Balanced" },
                  { name: "Fremont", price: "$1.4M", status: "Hot" },
                  { name: "Oakland Hills", price: "$1.1M", status: "Balanced" },
                ].map((city, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border hover:border-primary transition-colors cursor-pointer group bg-white">
                    <div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{city.name}</h4>
                      <span className="text-xs text-muted-foreground">Median: {city.price}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                        city.status.includes("Hot") ? "bg-red-100 text-red-700" : 
                        city.status === "Balanced" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {city.status}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Custom Subscription Form */}
            <SubscriptionForm />
          </div>

        </div>
      </div>
    </Layout>
  );
}
