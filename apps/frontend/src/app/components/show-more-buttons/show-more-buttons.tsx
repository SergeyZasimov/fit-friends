
export interface ShowMoreButtonsProps {
  maxLength: number;
  currentLength: number;
  onIncrease: () => void;
}

export function ShowMoreButtons({ currentLength, maxLength, onIncrease }: ShowMoreButtonsProps) {

  const handleUpClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {
        maxLength >= currentLength
          ?
          <button
            className="btn show-more__button show-more__button--more"
            type="button"
            onClick={ onIncrease }
          >
            Показать еще
          </button>
          :
          <button
            className="btn show-more__button"
            type="button"
            onClick={ handleUpClick }
          >Вернуться в начало</button>
      }
    </>
  );
}

export default ShowMoreButtons;
