import { useState } from "react";
import { CardDetails } from "../../../api/types";
import cancelCardIcon from "../../../assets/icons/deactivate_card.svg";
import eyeIcon from "../../../assets/icons/eye.svg";
import freezeCardIcon from "../../../assets/icons/freeze_card.svg";
import addToGPayIcon from "../../../assets/icons/gpay.svg";
import replaceCardIcon from "../../../assets/icons/replace_card.svg";
import setSpendLimitIcon from "../../../assets/icons/set_spend_limit.svg";
import CancelCardModal from "../../../components/CancelCardModal";

import { Carousel, CarouselItem } from "../../../components/Carousel";
import DebitCard from "../../../components/DebitCard";

type CardDisplayViewProps = {
  cards: CardDetails[];
  onCardFreezeUnfreeze: (cardIndex: number) => void;
  onCancelCard: (cardIndex: number) => void;
  activeCardIndex: number;
  onChangeActiveCardIndex: (index: number) => void;
};

const CardDisplayView = ({
  cards,
  onCardFreezeUnfreeze,
  onCancelCard,
  activeCardIndex,
  onChangeActiveCardIndex,
}: CardDisplayViewProps) => {
  const [isCardDetailsVisible, setIsCardDetailsVisible] = useState(false);
  const [isCancelCardModalOpen, setIsCancelCardModalOpen] = useState(false);

  const activeCard =
    activeCardIndex <= cards.length - 1 ? cards[activeCardIndex] : cards[0];

  return (
    <div className="card-carousel-wrapper">
      <button
        className="btn-toggle-card"
        aria-label="Toggle card details"
        onClick={() => setIsCardDetailsVisible((prev) => !prev)}
      >
        <img src={eyeIcon} className="h-4 w-4" alt="Show card number" />
        {isCardDetailsVisible ? "Hide" : "Show"} card number
      </button>

      <Carousel
        onChange={onChangeActiveCardIndex}
        activeIndex={activeCardIndex}
      >
        {cards.map((item, index) => (
          <CarouselItem key={item.cardNumber} _index={index}>
            <DebitCard {...item} isDetailsVisible={isCardDetailsVisible} />
          </CarouselItem>
        ))}
      </Carousel>

      <div className="card-actions-container">
        <button
          onClick={() => onCardFreezeUnfreeze(activeCardIndex)}
          aria-label="Freeze card"
        >
          <img src={freezeCardIcon} alt="Freeze card" />
          {activeCard.isFrozen ? "Unfreeze" : "Freeze"} card
        </button>
        <button aria-label="Set spend limit">
          <img src={setSpendLimitIcon} alt="Set spend limit" />
          Set spend limit
        </button>
        <button aria-label="Add to GPay">
          <img src={addToGPayIcon} alt="Add to GPay" />
          Add to GPay
        </button>
        <button aria-label="Replace card">
          <img src={replaceCardIcon} alt="Replace card" />
          Replace card
        </button>
        <button
          onClick={() => setIsCancelCardModalOpen(true)}
          aria-label="Cancel card"
        >
          <img src={cancelCardIcon} alt="Cancel card" />
          Cancel card
        </button>
      </div>

      <CancelCardModal
        isOpen={isCancelCardModalOpen}
        onClose={() => setIsCancelCardModalOpen(false)}
        onCancelCard={() => onCancelCard(activeCardIndex)}
      />
    </div>
  );
};

export default CardDisplayView;
