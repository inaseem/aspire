import { useLayoutEffect, useRef, useState } from 'react';
import { CardDetails } from '../../../api/types';
import cancelCardIcon from '../../../assets/icons/deactivate_card.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import freezeCardIcon from '../../../assets/icons/freeze_card.svg';
import addToGPayIcon from '../../../assets/icons/gpay.svg';
import replaceCardIcon from '../../../assets/icons/replace_card.svg';
import setSpendLimitIcon from '../../../assets/icons/set_spend_limit.svg';
import CancelCardModal from '../../../components/CancelCardModal';
import {
  Carousel,
  CarouselItem,
  CarouselRef,
} from '../../../components/Carousel';
import DebitCard from '../../../components/DebitCard';

type CardDisplayViewProps = {
  cards: CardDetails[];
  onCardFreezeUnfreeze: (cardIndex: number) => void;
  onCancelCard: (cardIndex: number) => void;
};

const CardDisplayView = ({
  cards,
  onCardFreezeUnfreeze,
  onCancelCard,
}: CardDisplayViewProps) => {
  const [isCardDetailsVisible, setIsCardDetailsVisible] = useState(false);
  const carouselRef = useRef<CarouselRef>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCancelCardModalOpen, setIsCancelCardModalOpen] = useState(false);

  useLayoutEffect(() => {
    if (!carouselRef.current) {
      return;
    }
    carouselRef.current.refresh();
  }, [cards]);

  const activeCard =
    activeCardIndex <= cards.length - 1 ? cards[activeCardIndex] : cards[0];

  return (
    <div className="card-carousel-wrapper">
      <button
        className="btn-toggle-card"
        onClick={() => setIsCardDetailsVisible((prev) => !prev)}
      >
        <img src={eyeIcon} className="h-4 w-4" alt="Show card number" />
        {isCardDetailsVisible ? 'Hide' : 'Show'} card number
      </button>

      <Carousel
        ref={carouselRef}
        items={cards}
        renderItem={({ item, isSnapPoint }) => (
          <CarouselItem
            key={item.cardNumber}
            isSnapPoint={isSnapPoint}
            className="h-auto max-w-full w-full lg:max-w-[414px]"
          >
            <DebitCard {...item} isDetailsVisible={isCardDetailsVisible} />
          </CarouselItem>
        )}
        onPageChange={(index) => setActiveCardIndex(index)}
      />

      <div className="card-actions-container">
        <button onClick={() => onCardFreezeUnfreeze(activeCardIndex)}>
          <img src={freezeCardIcon} alt="Freeze card" />
          {activeCard.isFrozen ? 'Unfreeze' : 'Freeze'} card
        </button>
        <button>
          <img src={setSpendLimitIcon} alt="Freeze card" />
          Set spend limit
        </button>
        <button>
          <img src={addToGPayIcon} alt="Freeze card" />
          Add to GPay
        </button>
        <button>
          <img src={replaceCardIcon} alt="Freeze card" />
          Replace card
        </button>
        <button onClick={() => setIsCancelCardModalOpen(true)}>
          <img src={cancelCardIcon} alt="Freeze card" />
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
