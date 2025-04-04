
import React, { Suspense, lazy, ComponentType } from 'react';

type LazyComponent<T extends ComponentType<any>> = React.LazyExoticComponent<T>;

// Simple loading skeleton for components
const ComponentSkeleton = ({ height = 'h-40', width = 'w-full' }: { height?: string; width?: string }) => (
  <div className={`${height} ${width} animate-pulse rounded-xl bg-terminal-purple/5 border border-terminal-purple/10`}></div>
);

export function useLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  height?: string,
  width?: string
): React.FC<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFunc);
  
  // Return a component that wraps the lazy-loaded component with Suspense
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={<ComponentSkeleton height={height} width={width} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
