import { useAppSelector } from '../../hooks/store-hooks';
import { getLoadingStatus } from '../../store/service/selectors';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Header from '../../components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';


export default function CommonLayout(): JSX.Element {
  const isLoading: boolean = useAppSelector(getLoadingStatus);

  if (isLoading) {
    return (<LoadingSpinner/>);
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
