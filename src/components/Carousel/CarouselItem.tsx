import React from "react";

export type CarouselItemProps = {
  children: React.ReactNode;
  _index?: number;
};

export const CarouselItem = React.forwardRef(
  ({ children, _index }: CarouselItemProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        key={`slide-${_index}`}
        className="slide min-w-full snap-center h-full"
        data-index={_index}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
