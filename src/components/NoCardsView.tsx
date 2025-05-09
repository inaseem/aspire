const NoCardsView = () => {
  return (
    <div className="flex items-center justify-center rounded-xl p-6 sm:p-7 bg-green42 mb-7 flex-col gap-4 w-full">
      <div className="text-grey13 text-sm font-semibold text-white sm:text-grey13">
        No cards!
      </div>
      <div className="text-grey67 text-sm text-center">
        You don't have any cards yet, Please add a new card to your account by
        clicking the "New Card" button.
      </div>
    </div>
  );
};

export default NoCardsView;
