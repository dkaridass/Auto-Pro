import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'auto-rotate-delay'?: string;
        'rotation-per-second'?: string;
        'camera-controls'?: boolean | string;
        'touch-action'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        exposure?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        'interaction-prompt'?: string;
        poster?: string;
        slot?: string;
      };
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'auto-rotate-delay'?: string;
        'rotation-per-second'?: string;
        'camera-controls'?: boolean | string;
        'touch-action'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        exposure?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        'interaction-prompt'?: string;
        poster?: string;
        slot?: string;
      };
    }
  }
}
