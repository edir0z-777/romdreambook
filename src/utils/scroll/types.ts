export interface ScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export interface ScrollToElementOptions extends ScrollOptions {
  elementId: string;
}