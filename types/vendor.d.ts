declare module 'vanta/dist/vanta.net.min' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NET: (options: Record<string, any>) => { destroy: () => void };
  export default NET;
}
declare module 'three';
