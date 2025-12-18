import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { label: "The Pulse", href: "/" },
    { label: "Market Data", href: "/market-data" },
    { label: "Insights", href: "/blog" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo Area */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img 
                src="/images/logo-mark.png" 
                alt="Bay Area Market Pulse" 
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none tracking-tight">BAY AREA</span>
                <span className="font-display font-bold text-lg leading-none tracking-tight text-primary">MARKET PULSE</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wider cursor-pointer",
                    location === item.href ? "text-primary font-bold" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Button variant="default" className="rounded-none font-bold uppercase tracking-wider ml-4">
              Subscribe
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span 
                      className={cn(
                        "text-2xl font-display font-bold transition-colors hover:text-primary cursor-pointer",
                        location === item.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <Button className="w-full rounded-none font-bold uppercase tracking-wider mt-4">
                  Subscribe for Updates
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 mt-20">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo-mark.png" alt="Logo" className="h-8 w-8" />
              <span className="font-display font-bold text-lg">BAY AREA MARKET PULSE</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Your daily source for real estate trends, market data, and expert insights in the Bay Area. Curated for professionals and savvy clients.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-4 uppercase tracking-wider text-sm">Sections</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 uppercase tracking-wider text-sm">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bay Area Market Pulse. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Presented By</span>
            <img src="/images/kapoor-logo-v3.png" alt="The Kapoor Group" className="h-20 md:h-24 object-contain opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </footer>
    </div>
  );
}
