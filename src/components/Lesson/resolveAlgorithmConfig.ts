import type { AlgorithmConfig } from "@/types";

/** A variant must never inherit another approach's language or experiment. */
export function resolveAlgorithmConfig(config: AlgorithmConfig, variantId?: string): AlgorithmConfig {
  const variant = config.variants?.find(v => v.id === variantId);
  if (!variant) return config;
  return {
    ...config,
    ...variant,
    id: config.id,
    title: config.title,
    python: variant.python,
    java: variant.java,
    cpp: variant.cpp,
    complexityExplorer: variant.complexityExplorer,
  };
}
