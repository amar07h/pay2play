export const pageView = () => {
  // @ts-ignore
  window.fbq('track', 'PageView');
};

export const event = (name: string, options = {}) => {
  // @ts-ignore
  window.fbq('track', name, options);
};
