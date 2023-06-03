import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/service/selectors';
import { PageRouteEnum } from '../../const/routes/page-route.enum';
import { AuthorizationStatusEnum } from '../../const/authorization-status.enum';
import { FormErrorEnum } from '../../const/form-error.enum';
import { RegisterDataType } from '../../types/register-data.type';

export default function Register(): JSX.Element {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState(FormErrorEnum.OK);
  const [emailError, setEmailError] = useState(FormErrorEnum.OK);
  const [passwordError, setPasswordError] = useState(FormErrorEnum.OK);


  const handleEmptyFields = () => {
    let errFlag = false;
    setNameError(FormErrorEnum.OK);
    setEmailError(FormErrorEnum.OK);
    setPasswordError(FormErrorEnum.OK);
    if (!nameRef.current?.value) {
      setNameError(FormErrorEnum.Empty);
      errFlag = true;
    }
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

    dispatch(registerAction({
      name: nameRef.current?.value as string,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    } as RegisterDataType));
    navigate(PageRouteEnum.Products);
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatusEnum.Auth) {
      navigate(PageRouteEnum.Products);
    }
  }, []);

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleSubmit}>
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input ref={nameRef} type="text" id="name" name="name" autoComplete="off" required/>
              <p className="input-login__error">{nameError}</p>
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input ref={emailRef} type="email" id="email" name="email" autoComplete="off" required/>
              <p className="input-login__error">{emailError}</p>
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input ref={passwordRef} type={passwordVisibility ? 'text' : 'password'} placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required/>
                <button className="input-login__button-eye" type="button"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              <p className="input-login__error">{passwordError}</p>
            </div>
            <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
          </form>
        </section>
      </div>
    </main>
  );
}
