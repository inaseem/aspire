import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Sidebar from './components/Sidebar/Sidebar';
import logoIconOnly from './assets/icons/logo_icon_only.svg';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';

const MobileHeader = () => {
  return (
    <div className="flex justify-end sm:hidden">
      <img src={logoIconOnly} className="h-[25px] cursor-pointer" />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col sm:flex-row">
        <div className="-ml-[340px] sm:ml-0 w-[340px] h-0 sm:h-screen overflow-y-auto bg-blue20">
          <Sidebar />
        </div>
        <div className="px-6 pt-6 sm:px-[60px] sm:py-[60px] bg-blue20 sm:bg-white flex-1 overflow-y-auto h-screen">
          <MobileHeader />
          <AppRoutes />
        </div>
        <div className="block sm:hidden sm:h-0">
          <BottomNavigation />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
