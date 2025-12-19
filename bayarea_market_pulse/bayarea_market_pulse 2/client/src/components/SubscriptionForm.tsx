import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SubscriptionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="font-display font-bold text-xl mb-2">You're on the list!</h3>
        <p className="text-muted-foreground text-sm">
          Watch your inbox for the next Daily 10 update.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg">Market Watch</h3>
          <p className="text-xs text-muted-foreground">Daily news & weekly reports</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
          <Input id="name" placeholder="Jane Doe" required className="bg-gray-50" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
          <Input id="email" type="email" placeholder="jane@example.com" required className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Counties of Interest</Label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              Santa Clara
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              San Mateo
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
              Alameda
            </label>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full font-bold uppercase tracking-wider" 
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </Button>
        
        <p className="text-[10px] text-center text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
