import { useNavigate } from 'react-router-dom';
import { PageRouteEnum } from '../../const/routes/page-route.enum';

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();
  return (
    <main className="page-content">
      <div className="container">
        <section className="error">
          <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
          <p className="error__text"> Возможно, страница была удалена или<br/>её вовсе не существовало.</p>
          <button onClick={() => navigate(PageRouteEnum.NotImplemented)} className="button button__error button--small button--black-border">Продолжить покупки</button>
        </section>
      </div>
    </main>
  );
}
