import { Link } from 'react-router-dom';

export function Intro() {
  return (
    <main>
      <div className="intro">
        <div className="intro__background">
          <picture>
            <source
              type="image/webp"
              srcSet="assets/img/content/sitemap//background.webp, assets/img/content/sitemap//background@2x.webp 2x" />
            <img
              src="assets/img/content/sitemap//background.jpg"
              srcSet="assets/img/content/sitemap//background@2x.jpg 2x"
              width="1440"
              height="1024"
              alt="Фон с бегущей девушкой" />
          </picture>
        </div>
        <div className="intro__wrapper">
          <svg className="intro__icon" width="60" height="60" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
          <div className="intro__title-logo">
            <picture>
              <source
                type="image/webp"
                srcSet="assets/img/content/sitemap//title-logo.webp, assets/img/content/sitemap//title-logo@2x.webp 2x" />
              <img
                src="assets/img/content/sitemap//title-logo.png"
                srcSet="assets/img/content/sitemap//title-logo@2x.png 2x"
                width="934"
                height="455"
                alt="Логотип Fit Friends" />
            </picture>
          </div>
          <div className="intro__buttons">
            <Link to="sign-up" className="btn intro__button" type="button">Регистрация</Link>
            <p className="intro__text">Есть аккаунт? <Link className="intro__link" to="sign-in">Вход</Link>
            </p>
          </div>
        </div>
      </div>
    </main>

  );
}

export default Intro;
