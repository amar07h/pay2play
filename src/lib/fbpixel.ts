export const pageView = () => {
// @ts-expect-error: fbq might not exist on window at build time
  window.fbq('track', 'PageView');
};

export const event = (name: string, options = {}) => {
// @ts-expect-error: fbq might not exist on window at build time
  window.fbq('track', name, options);
};
