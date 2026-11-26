import {
  BarChart3,
  BedDouble,
  Building2,
  Code2,
  Compass,
  Flame,
  LifeBuoy,
  PackageCheck,
  Plug,
  Settings,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Workflow,
  Zap,
} from 'lucide-react';
import { IconKey, PastelAccent } from '../data/content';

export function CrmIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: IconKey;
  className?: string;
}) {
  switch (name) {
    case 'users':
      return <Users className={className} aria-hidden="true" />;
    case 'zap':
      return <Zap className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'barChart':
      return <BarChart3 className={className} aria-hidden="true" />;
    case 'utensils':
      return <UtensilsCrossed className={className} aria-hidden="true" />;
    case 'bedDouble':
      return <BedDouble className={className} aria-hidden="true" />;
    case 'building2':
      return <Building2 className={className} aria-hidden="true" />;
    case 'flame':
      return <Flame className={className} aria-hidden="true" />;
    case 'jar':
      return <ShoppingBag className={className} aria-hidden="true" />;
    case 'packageCheck':
      return <PackageCheck className={className} aria-hidden="true" />;
    case 'settings':
      return <Settings className={className} aria-hidden="true" />;
    case 'workflow':
      return <Workflow className={className} aria-hidden="true" />;
    case 'plug':
      return <Plug className={className} aria-hidden="true" />;
    case 'code2':
      return <Code2 className={className} aria-hidden="true" />;
    case 'lifeBuoy':
      return <LifeBuoy className={className} aria-hidden="true" />;
  }
}

export function getPastelTileClasses(accent: PastelAccent): string {
  switch (accent) {
    case 'lavender':
      return 'bg-[#EDE9FE] text-[#5B21B6]';
    case 'pink':
      return 'bg-[#FCE7F3] text-[#BE185D]';
    case 'blue':
      return 'bg-[#DBEAFE] text-[#1D4ED8]';
    case 'green':
      return 'bg-[#DCFCE7] text-[#15803D]';
    case 'orange':
      return 'bg-[#FFEDD5] text-[#C2410C]';
  }
}

export function getPastelCardClasses(accent: PastelAccent): string {
  switch (accent) {
    case 'lavender':
      return 'bg-[#F7F4FF] border-[#E9D5FF] hover:border-[#C4B5FD]';
    case 'pink':
      return 'bg-[#FFF5F9] border-[#FBCFE8] hover:border-[#F9A8D4]';
    case 'blue':
      return 'bg-[#F4F9FF] border-[#BFDBFE] hover:border-[#93C5FD]';
    case 'green':
      return 'bg-[#F2FDF7] border-[#BBF7D0] hover:border-[#86EFAC]';
    case 'orange':
      return 'bg-[#FFF9F2] border-[#FED7AA] hover:border-[#FDBA74]';
  }
}
