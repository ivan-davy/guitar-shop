import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/service/selectors';
import { AuthDataType } from '../../types/auth-data.type';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { AuthorizationStatusEnum } from '../../const/authorization-status.enum';
import { redirectToRouteAction } from '../../store/service/actions';
import { FormErrorEnum } from '../../const/form-error.enum';

//TODO: сделать вывод ошибки аунтефикации как в ТЗ

export default function SignIn(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(FormErrorEnum.OK);
  const [passwordError, setPasswordError] = useState(FormErrorEnum.OK);


  const handleEmptyFields = () => {
    let errFlag = false;
    setEmailError(FormErrorEnum.OK);
    setPasswordError(FormErrorEnum.OK);
    if (!emailRef.current?.value) {
      setEmailError(FormErrorEnum.Empty);
      errFlag = true;
    }
    if (!passwordRef.current?.value) {
      setPasswordError(FormErrorEnum.Empty);
      errFlag = true;
    }
    return errFlag;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (handleEmptyFields()) {
      return;
    }

    dispatch(loginAction({
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    } as AuthDataType));
    navigate(PageRouteEnum.Products);
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatusEnum.Auth) {
      dispatch(redirectToRouteAction(PageRouteEnum.Products));
    }
  }, []);

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">Hовый пользователь? <Link to={PageRouteEnum.Register} className="login__link">Зарегистрируйтесь</Link> прямо сейчас</p>
          <form onSubmit={handleSubmit} method="post" noValidate>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input ref={emailRef} type="email" id="email" name="email" autoComplete="off" required/>
              <p className="input-login__error">{emailError}</p>
            </div>
            <div className="input-login">
              <label htmlFor="passwordLogin">Введите пароль</label>
              <span>
                <input ref={passwordRef} type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password"
                  autoComplete="off" required
                />
                <button className="input-login__button-eye" type="button">
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              <p className="input-login__error">{passwordError}</p>
            </div>
            <button className="button login__button button--medium" type="submit">Войти</button>
          </form>
        </section>
      </div>
    </main>
  );
}
