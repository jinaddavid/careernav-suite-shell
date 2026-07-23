import {
  Headphones,
  Briefcase,
  FlaskConical,
  Radio,
  Dumbbell,
  Route,
  type LucideIcon,
} from "lucide-react";
import type { SuiteProductId, SuiteProductUrls } from "./types";
import { withSso } from "./sso";

export type SuiteProductDef = {
  id: SuiteProductId;
  name: string;
  Icon: LucideIcon;
  iconColor: string;
  hoverBg: string;
  ringColor: string;
  activeBg: string;
  /** Studio-hosted path products (jobs, my-paths) */
  studioPath?: string;
};

export const SUITE_PRODUCTS: SuiteProductDef[] = [
  {
    id: "studio",
    name: "Studio",
    Icon: Headphones,
    iconColor: "text-teal-600 dark:text-teal-400",
    hoverBg: "hover:bg-teal-50 dark:hover:bg-teal-950/40",
    ringColor: "ring-teal-500",
    activeBg: "bg-teal-50 dark:bg-teal-950/50",
  },
  {
    id: "jobs",
    name: "Jobs",
    Icon: Briefcase,
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/40",
    ringColor: "ring-blue-500",
    activeBg: "bg-blue-50 dark:bg-blue-950/50",
    studioPath: "/jobs",
  },
  {
    id: "lab",
    name: "Lab",
    Icon: FlaskConical,
    iconColor: "text-purple-600 dark:text-purple-400",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-950/40",
    ringColor: "ring-purple-500",
    activeBg: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    id: "live",
    name: "Live",
    Icon: Radio,
    iconColor: "text-rose-600 dark:text-rose-400",
    hoverBg: "hover:bg-rose-50 dark:hover:bg-rose-950/40",
    ringColor: "ring-rose-500",
    activeBg: "bg-rose-50 dark:bg-rose-950/50",
  },
  {
    id: "gym",
    name: "Gym",
    Icon: Dumbbell,
    iconColor: "text-orange-600 dark:text-orange-400",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950/40",
    ringColor: "ring-orange-500",
    activeBg: "bg-orange-50 dark:bg-orange-950/50",
  },
  {
    id: "my-paths",
    name: "My Paths",
    Icon: Route,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
    ringColor: "ring-emerald-500",
    activeBg: "bg-emerald-50 dark:bg-emerald-950/50",
    studioPath: "/my-paths",
  },
];

export function productDisplayName(id: SuiteProductId): string {
  return SUITE_PRODUCTS.find((p) => p.id === id)?.name ?? id;
}

/** Resolve absolute href for a suite product tile. */
export function resolveProductHref(
  product: SuiteProductDef,
  urls: SuiteProductUrls,
  token?: string | null,
): string {
  let base: string;
  if (product.id === "studio") {
    base = urls.studio.replace(/\/$/, "") + "/";
  } else if (product.id === "lab") {
    base = urls.lab;
  } else if (product.id === "live") {
    base = urls.live;
  } else if (product.id === "gym") {
    base = urls.gym;
  } else if (product.studioPath) {
    base = urls.studio.replace(/\/$/, "") + product.studioPath;
  } else {
    base = urls.studio;
  }
  return withSso(base, token);
}
