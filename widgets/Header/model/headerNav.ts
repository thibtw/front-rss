export const headerNav = [
  { labelKey: "nav.demo", name: "Demo", containerId: "demoContainer" },
  {
    labelKey: "nav.platforms",
    name: "Platforms",
    containerId: "platformContainer",
  },
  {
    labelKey: "nav.features",
    name: "Features",
    containerId: "featuresContainer",
  },
  { labelKey: "nav.reviews", name: "Reviews", containerId: "reviewsContainer" },
] as const;

export type ContainerId = (typeof headerNav)[number]["containerId"];
