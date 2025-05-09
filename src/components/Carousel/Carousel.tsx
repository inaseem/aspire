import clsx from "clsx";
import React, { useEffect } from "react";
import { useSlideInteraction } from "../../hooks/useSlideInteraction";
import { CarouselItemProps } from "./CarouselItem";

export const Carousel = ({
  children,
  onChange,
  activeIndex = 0,
}: {
  children: React.ReactElement<CarouselItemProps>[];
  onChange?: (index: number) => void;
  activeIndex?: number;
}) => {
  const slideRefs = React.useRef<HTMLElement[]>([]);
  const slideContainerRef = React.useRef(null);
  const [activeIndexInternal, setActiveIndexInternal] =
    React.useState(activeIndex);

  const childrenWithIndex = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      _index: index,
      ref: (node: HTMLElement | null) => {
        if (!node) return;
        slideRefs.current[index] = node;
      },
    } as any);
  });

  const goToSlide = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < slideRefs.current.length) {
        slideRefs.current[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        onChange?.(index);
      }
    },
    [onChange]
  );

  useEffect(() => {
    goToSlide(activeIndexInternal);
  }, [setActiveIndexInternal]);

  useSlideInteraction({
    slideRefs,
    root: slideContainerRef.current!,
    onActiveIndexChange: onChange!,
  });

  return (
    <div>
      <div
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
        ref={slideContainerRef}
      >
        {childrenWithIndex}
      </div>
      <div className="flex justify-center items-center mt-2">
        {childrenWithIndex.map((_, index) => (
          <div
            className={clsx("rounded-lg bg-green41 w-2 h-2 m-2", {
              "opacity-30": activeIndex !== index,
              "opacity-100 w-4": activeIndex === index,
            })}
            key={index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
