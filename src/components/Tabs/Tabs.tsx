import clsx from 'clsx';
import styles from './index.module.scss';

type TabsProps = {
  items: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
};

const Tabs = ({ items, activeIndex, onChange }: TabsProps) => {
  return (
    <div className="flex gap-8 mt-8">
      {items.map((item, index) => (
        <div
          key={index}
          className={clsx(styles.tab, 'sm:text-grey13', {
            [styles.active]: activeIndex === index,
          })}
          onClick={() => onChange?.(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
