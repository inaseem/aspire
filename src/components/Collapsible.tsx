import clsx from "clsx";
import React from "react";
import downArrowIcon from "../assets/icons/down_arrow.svg";

type CollapsibleProps = {
  icon: string;
  title: string;
  isDefaultOpen?: boolean;
};

const Collapsible = ({
  children,
  title,
  icon,
  isDefaultOpen = false,
}: React.PropsWithChildren<CollapsibleProps>) => {
  const [isOpen, setIsOpen] = React.useState(isDefaultOpen);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        role="button"
        className="z-[3] w-full relative shadow-cardLight4 p-6 flex justify-between bg-blue98 rounded-lg border border-blue100 cursor-pointer hover:opacity-100"
        onClick={handleClick}
      >
        <div className="flex gap-3 items-center">
          <img src={icon} className="w-6 h-6" alt="" />
          <span className="text-sm text-blue20">{title}</span>
        </div>
        <img
          src={downArrowIcon}
          className={`h-5 w-5 transition duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          alt=""
        />
      </button>
      <div
        className={clsx({
          "h-auto": isOpen,
          "h-0": !isOpen,
        })}
      >
        {isOpen ? children : null}
      </div>
    </div>
  );
};

export default Collapsible;
