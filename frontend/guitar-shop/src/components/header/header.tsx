import { Link } from 'react-router-dom';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { AuthorizationStatusEnum } from '../../const/authorization-status.enum';
import { getAuthStatus } from '../../store/service/selectors';
import { useAppSelector } from '../../hooks/store-hooks';
import { getUserData } from '../../store/user/selectors';


export default function Header(): JSX.Element {
  const authStatus: AuthorizationStatusEnum = useAppSelector(getAuthStatus);
  const userData = useAppSelector(getUserData);

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={PageRouteEnum.SignIn}>
            <img className="logo__img" width="70" height="70" src="./guitar-shop/img/svg/logo.svg" alt="Логотип"/>
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="link main-nav__link">Каталог</a></li>
              { authStatus === AuthorizationStatusEnum.Auth && userData.hasAdminRights ?
                <li className="main-nav__item"><Link to={PageRouteEnum.Products} className="link main-nav__link">Список товаров</Link></li> :
                <><li className="main-nav__item"><a className="link main-nav__link">Где купить?</a></li>
                  <li className="main-nav__item"><a className="link main-nav__link">О нас</a></li>
                </>}
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">
              {authStatus === AuthorizationStatusEnum.Auth ? userData.name : null}
            </span>
            <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
