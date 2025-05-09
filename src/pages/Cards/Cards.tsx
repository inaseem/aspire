import { useState } from "react";
import cardDetailsIcon from "../../assets/icons/card_details.svg";

import { useQuery } from "react-query";
import api from "../../api";
import { CardDetails } from "../../api/types";
import AddCardModal from "../../components/AddCardModal";
import AddIcon from "../../components/AddIcon";
import Collapsible from "../../components/Collapsible";
import NoCardsView from "../../components/NoCardsView";
import Tabs from "../../components/Tabs/Tabs";
import { GET_CARDS } from "../../queries";
import { getRandomCardDetauils } from "../../utils";
import CardDisplayView from "./components/CardDisplayView";
import TransactionsList from "./components/TransactionsList/TransactionsList";
import styles from "./index.module.scss";

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cards, setCards] = useState<CardDetails[]>([]);

  const { isLoading } = useQuery({
    queryKey: GET_CARDS,
    queryFn: () => api.getCards(),
    onSuccess: (data) => {
      setCards(data);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddCardClick = () => {
    setIsAddCardModalOpen(true);
  };

  const handleAddCard = (cardName: string) => {
    setCards((prev) => [...prev, getRandomCardDetauils(cardName)]);
    setIsAddCardModalOpen(false);
    setActiveCardIndex(cards.length);
  };

  const handleCardFreezeUnfreeze = (cardIndex: number) => {
    setCards((prev) =>
      prev.map((card, index) =>
        index === cardIndex ? { ...card, isFrozen: !card.isFrozen } : card
      )
    );
  };

  const handleCancelCard = (cardIndex: number) => {
    setCards((prev) => prev.filter((_, index) => index !== cardIndex));
  };

  return (
    <div className={styles["cards-page-wrapper"]}>
      <div className="sm:text-grey13 text-sm font-semibold sm:font-normal">
        Available balance
      </div>
      <div className="flex justify-between mt-4 sm:mt-2">
        <div className={styles["balance-container"]}>
          <span className="prefix">S$</span>
          <span className="amount">3,000</span>
        </div>
        <button
          aria-label="Add new card"
          className={styles["btn-new-card"]}
          onClick={handleAddCardClick}
        >
          <AddIcon />
          <span>New Card</span>
        </button>
      </div>
      <Tabs
        items={["My debit cards", "All company cards"]}
        activeIndex={activeIndex}
        onChange={(index) => setActiveIndex(index)}
      />
      <div className={styles["tabs-content-container"]}>
        {cards.length > 0 ? (
          <>
            <CardDisplayView
              activeCardIndex={activeCardIndex}
              onChangeActiveCardIndex={setActiveCardIndex}
              key={cards.length}
              cards={cards}
              onCardFreezeUnfreeze={handleCardFreezeUnfreeze}
              onCancelCard={handleCancelCard}
            />
            <div className="details-container">
              <Collapsible icon={cardDetailsIcon} title="Card details" />
              <Collapsible
                icon={cardDetailsIcon}
                title="Recent transactions"
                isDefaultOpen
              >
                <TransactionsList />
              </Collapsible>
            </div>
          </>
        ) : (
          <NoCardsView />
        )}
      </div>
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
};

export default Cards;
