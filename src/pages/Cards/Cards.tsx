import { useState } from 'react';
import cardDetailsIcon from '../../assets/icons/card_details.svg';

import AddIcon from '../../components/AddIcon';
import Collapsible from '../../components/Collapsible';
import Tabs from '../../components/Tabs/Tabs';
import CardDisplayView from './components/CardDisplayView';
import TransactionsList from './components/TransactionsList/TransactionsList';
import styles from './index.module.scss';

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles['cards-page-wrapper']}>
      <div className="sm:text-grey13 text-sm font-semibold sm:font-normal">
        Available balance
      </div>
      <div className="flex justify-between mt-4 sm:mt-2">
        <div className={styles['balance-container']}>
          <span className="prefix">S$</span>
          <span className="amount">3,000</span>
        </div>
        <button className={styles['btn-new-card']}>
          <AddIcon />
          <span>New Card</span>
        </button>
      </div>
      <Tabs
        items={['My debit cards', 'All company cards']}
        activeIndex={activeIndex}
        onChange={(index) => setActiveIndex(index)}
      />
      <div className={styles['tabs-content-container']}>
        <CardDisplayView />
        <div className="details-container">
          <Collapsible icon={cardDetailsIcon} title="Card details" />
          <Collapsible
            icon={cardDetailsIcon}
            title="Recent transactions"
            isDefaultOpen
          >
            <TransactionsList />
          </Collapsible>
          C
        </div>
      </div>
    </div>
  );
};

export default Cards;
