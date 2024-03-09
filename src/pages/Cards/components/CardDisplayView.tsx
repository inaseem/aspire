import { useState } from 'react';

import cancelCardIcon from '../../../assets/icons/deactivate_card.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import freezeCardIcon from '../../../assets/icons/freeze_card.svg';
import addToGPayIcon from '../../../assets/icons/gpay.svg';
import replaceCardIcon from '../../../assets/icons/replace_card.svg';
import setSpendLimitIcon from '../../../assets/icons/set_spend_limit.svg';
import { Carousel, CarouselItem } from '../../../components/Carousel';
import DebitCard from '../../../components/DebitCard';
import { cards } from '../../../constants';

const CardDisplayView = () => {
  const [isCardDetailsVisible, setIsCardDetailsVisible] = useState(false);
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
        items={cards}
        renderItem={({ item, isSnapPoint }) => (
          <CarouselItem
            key={item.cardNumber}
            isSnapPoint={isSnapPoint}
            className="h-auto max-w-full w-full sm:max-w-[414px]"
          >
            <DebitCard {...item} isDetailsVisible={isCardDetailsVisible} />
          </CarouselItem>
        )}
      />
      <div className="card-actions-container">
        <button>
          <img src={freezeCardIcon} alt="Freeze card" />
          Freeze card
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
        <button>
          <img src={cancelCardIcon} alt="Freeze card" />
          Cancel card
        </button>
      </div>
    </div>
  );
};

export default CardDisplayView;
