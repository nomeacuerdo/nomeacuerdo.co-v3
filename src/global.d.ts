export {};

declare global {
  interface Window {
    VANTA: {
      WAVES: (options: VantaWavesOptions) => VantaEffectInstance;
      // Add other effects like FOG, WAVES, etc. if needed
    };
  }
}

interface VantaWavesOptions {
  el: string | HTMLElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  color?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
  shininess?: number;
  waveHeight?: number;
  waveSpeed?: number;
  zoom?: number;
  showDots?: boolean;
  // THREE?: any; // Optional: if you're injecting your own THREE instance
}

interface VantaEffectInstance {
  destroy: () => void;
  resize: () => void;
  setOptions: (options: Partial<VantaNetOptions>) => void;
}
