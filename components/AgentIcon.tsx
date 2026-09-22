import {
  BellRing, Calculator, CalendarDays, Car, Compass, Crosshair, Eye, FileOutput, FileSearch, FileText,
  Gauge, Globe, HeartPulse, Inbox, Megaphone, Network, PenLine, Presentation, Radar, RefreshCw,
  Scale, Sparkles, Sunrise, Zap, type LucideProps,
} from "lucide-react";

const MAP = {
  BellRing, Calculator, CalendarDays, Car, Compass, Crosshair, Eye, FileOutput, FileSearch, FileText,
  Gauge, Globe, HeartPulse, Inbox, Megaphone, Network, PenLine, Presentation, Radar, RefreshCw,
  Scale, Sparkles, Sunrise, Zap,
};

export function AgentIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = MAP[name as keyof typeof MAP] ?? Sparkles;
  return <Icon strokeWidth={1.6} aria-hidden="true" {...props} />;
}
