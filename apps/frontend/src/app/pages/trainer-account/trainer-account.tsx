import { User } from '@fit-friends/shared';
import AccountForm from '../../components/account-form/account-form';
import { useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';

export function TrainerAccount() {

  const user = useAppSelector(getUser) as User;

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container"><a className="header__logo" href="index.html" aria-label="Переход на главную">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg></a>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="main-nav__link is-active" href="#" aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg></a></li>
              <li className="main-nav__item"><a className="main-nav__link" href="#" aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg></a></li>
              <li className="main-nav__item"><a className="main-nav__link" href="#" aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg></a></li>
              <li className="main-nav__item main-nav__item--notifications"><a className="main-nav__link" href="#" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg></a>
                <div className="main-nav__dropdown">
                  <p className="main-nav__label">Оповещения</p>
                  <ul className="main-nav__sublist">
                    <li className="main-nav__subitem"><a className="notification is-active" href="#">
                      <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                      <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time></a>
                    </li>
                    <li className="main-nav__subitem"><a className="notification is-active" href="#">
                      <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                      <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time></a>
                    </li>
                    <li className="main-nav__subitem"><a className="notification is-active" href="#">
                      <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                      <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time></a>
                    </li>
                    <li className="main-nav__subitem"><a className="notification" href="#">
                      <p className="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                      <time className="notification__time" dateTime="2023-12-14 08:15">14 декабря, 08:15</time></a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          <div className="search">
            <form action="#" method="get">
              <label><span className="search__label">Поиск</span>
                <input type="search" name="search" />
                <svg className="search__icon" width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-search"></use>
                </svg>
              </label>
              <ul className="search__list">
                <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
                <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
                <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
                <li className="search__item"><a className="search__link" href="#">Text</a></li>
              </ul>
            </form>
          </div>
        </div>
      </header>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <div className="input-load-avatar">
                    <label>
                      <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
                      <span className="input-load-avatar__avatar">
                        <img
                          src={ user.profile?.avatar as string }
                          width="98"
                          height="98"
                          alt={ user.profile?.name }
                        />
                      </span>
                    </label>
                  </div>
                  <div className="user-info-edit__controls">
                    <button className="user-info-edit__control-btn" aria-label="обновить">
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button className="user-info-edit__control-btn" aria-label="удалить">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <AccountForm user={ user } />
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-flash"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои тренировки</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span></a>
                    <div className="personal-account-coach__calendar"></div>
                  </div>
                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                      <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg><span>Загрузить</span>
                      </button>
                      <div className="personal-account-coach__controls">
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className="personal-account-coach__list">
                      <li className="personal-account-coach__item">
                        <div className="certificate-card certificate-card--edit">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x" />
                              <img src="img/content/certificates-and-diplomas/certificate-1.jpg" srcSet="img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x" width="294" height="360" alt="Сертификат - Биомеханика ударов в боксе" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x" />
                              <img src="img/content/certificates-and-diplomas/certificate-2.jpg" srcSet="img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x" />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-3.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертифиционный курс по кроссфиту 2-го уровня" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-4.webp, img/content/certificates-and-diplomas/certificate-4@2x.webp 2x" />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-4.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат инструкторов йоги" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-5.webp, img/content/certificates-and-diplomas/certificate-5@2x.webp 2x" />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-5.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат фитне аэробики" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-6.webp, img/content/certificates-and-diplomas/certificate-6@2x.webp 2x" />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-6.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат фитне аэробики"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

  );
}

export default TrainerAccount;
