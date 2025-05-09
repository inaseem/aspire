import { useEffect } from "react";

export const useSlideInteraction = ({
  slideRefs,
  root,
  onActiveIndexChange,
}: {
  slideRefs: React.RefObject<HTMLElement[]>;
  root: HTMLElement;
  onActiveIndexChange: (index: number) => void;
}) => {
  let observer: IntersectionObserver;
  useEffect(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = (entry.target as HTMLDivElement).dataset.index;
            onActiveIndexChange(Number(index));
          }
        });
      },
      {
        root,
        threshold: 0.9,
      }
    );
  }, [slideRefs, root, onActiveIndexChange]);

  useEffect(() => {
    slideRefs.current?.forEach((slide) => {
      observer.observe(slide);
    });

    return () => {
      slideRefs.current?.forEach((slide) => {
        observer.unobserve(slide);
      });
      observer.disconnect();
    };
  }, [slideRefs]);
};
