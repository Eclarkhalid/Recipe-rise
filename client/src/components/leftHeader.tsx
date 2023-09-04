import { leftbarLinks } from '@/constants/index'
import { Link, useLocation } from 'react-router-dom';

const LeftHeader = () => {
  const location = useLocation();
  return <>
    <div className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {leftbarLinks.map((link) => {
          const isActive = (location.pathname.includes(link.route) && link.route.length > 1) || location.pathname === link.route;
          return (
            <Link to={link.route} key={link.label} className={`leftsidebar_link ${isActive && 'bg-blue-300'}`}>
              <img src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </div>
    </>;
}

    export default LeftHeader;