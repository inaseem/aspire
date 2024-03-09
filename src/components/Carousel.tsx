/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { CSSProperties, useEffect } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import clsx from 'clsx';

const styles = {
  root: {},
  scroll: {
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    boxSizing: 'border-box',
  },
  item: {
    flexShrink: 0,
  },
  itemSnapPoint: {
    scrollSnapAlign: 'start',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    display: 'flex',
  },
} satisfies Record<string, CSSProperties>;

interface CarouselProps<T> {
  readonly items: T[];
  readonly renderItem: (
    props: CarouselRenderItemProps<T>
  ) => React.ReactElement<CarouselItemProps>;
}

interface CarouselRenderItemProps<T> {
  readonly item: T;
  readonly isSnapPoint: boolean;
}

export const Carousel = <T extends any>({
  items,
  renderItem,
}: CarouselProps<T>) => {
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes,
  } = useSnapCarousel();

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          next();
          return;
        case 'ArrowRight':
          prev();
          return;
        default:
          return;
      }
    };
    window.addEventListener('keypress', handle);
    return () => {
      window.removeEventListener('keypress', handle);
    };
  }, [next, prev]);

  return (
    <div>
      <ul style={styles.scroll} ref={scrollRef} className="rounded-xl">
        {items.map((item, i) =>
          renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i),
          })
        )}
      </ul>
      <div style={styles.controls} aria-hidden className="mt-2">
        {pages.map((_, i) => (
          <button
            key={i}
            className={clsx('rounded-lg bg-green41 w-2 h-2 m-2', {
              'opacity-30': activePageIndex !== i,
              'opacity-100 w-4': activePageIndex === i,
            })}
            onClick={() => goTo(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};

interface CarouselItemProps {
  readonly isSnapPoint: boolean;
  readonly children?: React.ReactNode;
  className?: string;
}

export const CarouselItem = ({
  isSnapPoint,
  children,
  className,
}: CarouselItemProps) => (
  <li
    style={{
      ...styles.item,
      ...(isSnapPoint ? styles.itemSnapPoint : {}),
    }}
    className={className}
  >
    {children}
  </li>
);
