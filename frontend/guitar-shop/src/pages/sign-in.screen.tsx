import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {useNavigate} from 'react-router-dom';
import {AuthDataType} from '../../types/types';
import {loginAction} from '../../store/api-actions';
import {AuthorizationStatus, PageRoute} from '../../const';
import {EMAIL_PATTERN, PASSWORD_PATTERN} from '../../regex';
import {redirectToRouteAction} from '../../store/action';
import {getAuthStatus} from '../../store/service/selectors';

function getSignInErrorMessage(inputId: string): string {
  if (inputId === 'user-email') {
    return 'Please enter a valid email address';
  }
  if (inputId === 'user-password') {
    return 'Please enter a valid password';
  }
  return '';
}

export default function SignInScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authStatus = useAppSelector(getAuthStatus);
  const [errFieldId, setErrFieldId] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthDataType) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!EMAIL_PATTERN.test(loginRef.current?.value)) {
        setErrFieldId('user-email');
        return;
      }
      if (!PASSWORD_PATTERN.test(passwordRef.current?.value)) {
        setErrFieldId('user-password');
        return;
      }
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
    navigate(PageRoute.Home);
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRouteAction('/'));
    }
  }, []);

  return (
    <div className="user-page">
    <header className="page-header user-page__head">
    <Logo />
    <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
  <form onSubmit={handleSubmit} className="sign-in__form" noValidate>
  <div className="sign-in__message">
    <p>{getSignInErrorMessage(errFieldId)}</p>
    </div>
    <div className="sign-in__fields">
  <div className={`sign-in__field ${errFieldId === 'user-email' ? 'sign-in__field--error' : ''}`}>
  <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email"
  id="user-email" required
  />
  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
  </div>
  <div className={`sign-in__field ${errFieldId === 'user-password' ? 'sign-in__field--error' : ''}`}>
  <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password"
  id="user-password" required
  />
  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
    </div>
    </div>
    <div className="sign-in__submit">
  <button className="sign-in__btn" type="submit">Sign in</button>
    </div>
    </form>
    </div>
    <Footer />
    </div>
);
}
