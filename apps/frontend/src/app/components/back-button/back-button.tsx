import { browserHistory } from '../../services/browser-history.service';

export function BackButton() {
  return (
    <button
      className="btn-flat inner-page__back"
      type="button"
      onClick={ () => browserHistory.back() }
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}

export default BackButton;
