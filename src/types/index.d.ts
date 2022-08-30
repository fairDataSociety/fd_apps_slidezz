export {};

declare global {
  interface Window {
    _detectedSiteType: { type: string; url: string; basePath: string };
  }
}
