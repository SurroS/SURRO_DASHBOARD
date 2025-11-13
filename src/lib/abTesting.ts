"use client";

/**
 * A/B Testing Utility
 * Simple client-side A/B testing using localStorage for persistence
 */

export type ExperimentVariant = "A" | "B";

export interface Experiment {
  id: string;
  name: string;
  variants: {
    A: string;
    B: string;
  };
  // Percentage of users in variant B (0-100)
  variantBSplit: number;
}

// Active experiments
export const EXPERIMENTS: Record<string, Experiment> = {
  login_role_dropdown: {
    id: "login_role_dropdown",
    name: "Login Page Role Dropdown Removal",
    variants: {
      A: "control", // With dropdown
      B: "test", // Without dropdown
    },
    variantBSplit: 50, // 50% of users see variant B
  },
};

/**
 * Get the variant for a specific experiment
 * Uses consistent hashing based on user identifier (email or session)
 */
export function getExperimentVariant(
  experimentId: string,
  userId?: string
): ExperimentVariant {
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) {
    console.warn(`Experiment ${experimentId} not found`);
    return "A";
  }

  // Check if user already has a variant assigned (persistent)
  const storageKey = `ab_test_${experimentId}`;
  const storedVariant = localStorage.getItem(
    storageKey
  ) as ExperimentVariant | null;

  if (storedVariant && (storedVariant === "A" || storedVariant === "B")) {
    return storedVariant;
  }

  // Assign new variant based on hash of userId or random
  const identifier = userId || `anonymous_${Date.now()}`;
  const hash = simpleHash(identifier);
  const variant = hash % 100 < experiment.variantBSplit ? "B" : "A";

  // Store for persistence
  localStorage.setItem(storageKey, variant);

  return variant;
}

/**
 * Simple hash function for consistent variant assignment
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Track experiment event (for analytics)
 */
export function trackExperimentEvent(
  experimentId: string,
  variant: ExperimentVariant,
  event: string,
  metadata?: Record<string, any>
): void {
  // In production, send to your analytics service
  console.log("Experiment Event:", {
    experimentId,
    variant,
    event,
    metadata,
    timestamp: new Date().toISOString(),
  });

  // Example: Send to analytics API
  // fetch('/api/analytics/experiment', {
  //   method: 'POST',
  //   body: JSON.stringify({ experimentId, variant, event, metadata })
  // });
}

/**
 * Get experiment variant name
 */
export function getVariantName(
  experimentId: string,
  variant: ExperimentVariant
): string {
  const experiment = EXPERIMENTS[experimentId];
  return experiment?.variants[variant] || variant;
}
