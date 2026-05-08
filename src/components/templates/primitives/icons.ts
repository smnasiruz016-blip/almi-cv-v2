import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Code,
  Globe,
  GraduationCap,
  Heart,
  Languages,
  Layers,
  Lightbulb,
  Link2,
  Mail,
  MapPin,
  Phone,
  Star,
  Target,
  User,
  Users,
  Wrench,
} from "lucide-react";

export const ICON_ALLOWLIST = {
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  code: Code,
  wrench: Wrench,
  heart: Heart,
  star: Star,
  award: Award,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  globe: Globe,
  link: Link2,
  calendar: Calendar,
  user: User,
  languages: Languages,
  lightbulb: Lightbulb,
  target: Target,
  layers: Layers,
  "book-open": BookOpen,
  users: Users,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_ALLOWLIST;

export function resolveIcon(name: string | undefined): LucideIcon | undefined {
  if (!name) return undefined;
  return (ICON_ALLOWLIST as Record<string, LucideIcon | undefined>)[name];
}
