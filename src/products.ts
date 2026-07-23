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
  /** Studio-hosted path products (jobs, my-paths) */
  studioPath?: string;
};

export const SUITE_PRODUCTS: SuiteProductDef[] = [
  { id: "studio", name: "Studio", Icon: Headphones },
  { id: "jobs", name: "Jobs", Icon: Briefcase, studioPath: "/jobs" },
  { id: "lab", name: "Lab", Icon: FlaskConical },
  { id: "live", name: "Live", Icon: Radio },
  { id: "gym", name: "Gym", Icon: Dumbbell },
  { id: "my-paths", name: "My Paths", Icon: Route, studioPath: "/my-paths" },
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
