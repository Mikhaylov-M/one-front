import './Header.scss'
import logo from '../../images/logo.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';
import { UNAUTH_ACTION } from '../../../store/actionCreators/isAuth';

export const Header = () => {

  const distpatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector(state => state)
  const location = useLocation()

  const handleLogout = () => {
    distpatch(UNAUTH_ACTION())
    navigate('/')
  }

  const [ burger, setBurger ] = useState(false)
  useEffect(() => {
    if (burger) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }

    // Очистка класса при размонтировании компонента (необязательно)
    return () => {
      document.body.classList.remove('lock');
    };
  }, [burger]);

  const handleBurgerClick = () => {
    setBurger( prev => !prev )
  }

  return (
    <>
      <header className="header">
        <div className="header__container">
          <nav className="header__nav">
            <Link className="header__logo" to="/"><img src={logo} alt='логотип компании' /></Link>
            <ul className="header__list">
              <li className="header__items"><NavHashLink to='/' smooth className="header__links">Главная</NavHashLink></li>
              <li className="header__items">
                <NavHashLink smooth to='/#calculator' className="header__links">Калькулятор</NavHashLink></li>
              <li className="header__items">
                <NavHashLink smooth to='/#tracking' className="header__links">Отслеживание</NavHashLink></li>
              <li className="header__items">
                <NavHashLink smooth to='/#contact' className="header__links">Контакты</NavHashLink></li>
            </ul>
            {selector.isAuth ? 
              (
                location.pathname === "/profile" ? (<button className="header__btn" onClick={handleLogout}>Выйти</button>)
                : (<Link to='/profile' className="header__btn">Профиль</Link>)              
              )
              :
              <Link to='/login' className="header__btn">
                Вход
              </Link>
            }
            <div className={ burger ? "header__menu-btn active" : "header__menu-btn" } onClick={ handleBurgerClick }>
              <span></span>
            </div>
            <div className={ burger ? "header-menu  active" : "header-menu" }>
              <nav className="header-menu__nav">
                <ul className="header-menu__list">
                  <li className="header-menu__items">
                    {selector.isAuth ? 
                    (
                      location.pathname === "/profile" ? (<button className="header-menu__links" onClick={() => {
                        handleLogout()
                        handleBurgerClick()
                      }}>Выход</button>)
                      : (<Link to='/profile' className="header-menu__links" onClick={ handleBurgerClick }>Профиль</Link>)              
                    )
                    :
                    <Link to='/login' className="header-menu__links" onClick={ handleBurgerClick }>
                      Вход
                    </Link>
                  }
                  </li>
                  <li className="header-menu__items">
                    <NavHashLink to='/' className="header-menu__links" onClick={ handleBurgerClick }>
                      Главная
                    </NavHashLink>
                  </li>
                  <li className="header-menu__items">
                    <NavHashLink to='/#calculator' className="header-menu__links" onClick={ handleBurgerClick }>
                      Калькулятор
                    </NavHashLink>
                  </li>
                  <li className="header-menu__items">
                    <NavHashLink to='/#tracking' className="header-menu__links" onClick={ handleBurgerClick }>
                      Отслеживание
                    </NavHashLink>
                  </li>
                  <li className="header-menu__items">
                    <NavHashLink to='/#contact' className="header-menu__links" onClick={ handleBurgerClick }>
                      Контакты
                    </NavHashLink>
                  </li>
                </ul>
                <div className="header-menu__social-wrapper">
                  <a className="header-menu__social" href="https://t.me/oneexpresskg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0ZM12.5189 9.00553C11.4441 9.45256 9.29616 10.3778 6.07494 11.7812C5.55186 11.9892 5.27785 12.1927 5.25291 12.3917C5.21075 12.728 5.63186 12.8604 6.2053 13.0407C6.28331 13.0652 6.36413 13.0906 6.44699 13.1176C7.01117 13.301 7.77009 13.5155 8.16462 13.524C8.5225 13.5318 8.92193 13.3842 9.36292 13.0814C12.3726 11.0498 13.9262 10.0229 14.0238 10.0008C14.0926 9.98516 14.1879 9.96553 14.2525 10.023C14.3171 10.0804 14.3108 10.1891 14.3039 10.2183C14.2622 10.3962 12.6092 11.9329 11.7538 12.7282C11.4871 12.9762 11.2979 13.152 11.2593 13.1922C11.1726 13.2822 11.0844 13.3673 10.9995 13.4491C10.4754 13.9543 10.0823 14.3332 11.0213 14.952C11.4725 15.2494 11.8336 15.4952 12.1938 15.7405C12.5872 16.0084 12.9795 16.2757 13.4872 16.6084C13.6165 16.6932 13.7401 16.7813 13.8604 16.8671C14.3182 17.1934 14.7295 17.4867 15.2376 17.4399C15.5329 17.4127 15.8379 17.1351 15.9928 16.307C16.3588 14.3501 17.0784 10.1101 17.2447 8.36285C17.2592 8.20977 17.2409 8.01386 17.2262 7.92786C17.2115 7.84186 17.1807 7.71932 17.0689 7.62862C16.9365 7.52119 16.7322 7.49854 16.6407 7.50007C16.2251 7.50747 15.5875 7.72919 12.5189 9.00553Z" fill="#686A67"/>
                    </svg>
                  </a>
                  <a className="header-menu__social" href="https://www.instagram.com/oneexpress.kg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14.1C10.875 14.1 9.9 13.2 9.9 12C9.9 10.875 10.8 9.9 12 9.9C13.125 9.9 14.1 10.8 14.1 12C14.1 13.125 13.125 14.1 12 14.1Z" fill="#686A67"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.55 6.9H9.45C8.85 6.975 8.55 7.05 8.325 7.125C8.025 7.2 7.8 7.35 7.575 7.575C7.39696 7.75304 7.31284 7.93108 7.21116 8.14628C7.18437 8.20299 7.15628 8.26244 7.125 8.325C7.1134 8.35981 7.1 8.39641 7.08564 8.43564C7.00718 8.65 6.9 8.94282 6.9 9.45V14.55C6.975 15.15 7.05 15.45 7.125 15.675C7.2 15.975 7.35 16.2 7.575 16.425C7.75304 16.603 7.93108 16.6872 8.14628 16.7888C8.20304 16.8157 8.26239 16.8437 8.325 16.875C8.35981 16.8866 8.39641 16.9 8.43564 16.9144C8.65 16.9928 8.94282 17.1 9.45 17.1H14.55C15.15 17.025 15.45 16.95 15.675 16.875C15.975 16.8 16.2 16.65 16.425 16.425C16.603 16.247 16.6872 16.0689 16.7888 15.8537C16.8156 15.797 16.8437 15.7376 16.875 15.675C16.8866 15.6402 16.9 15.6036 16.9144 15.5644C16.9928 15.35 17.1 15.0572 17.1 14.55V9.45C17.025 8.85 16.95 8.55 16.875 8.325C16.8 8.025 16.65 7.8 16.425 7.575C16.247 7.39696 16.0689 7.31284 15.8537 7.21116C15.797 7.18439 15.7375 7.15625 15.675 7.125C15.6402 7.1134 15.6036 7.1 15.5644 7.08564C15.35 7.00718 15.0572 6.9 14.55 6.9ZM12 8.775C10.2 8.775 8.775 10.2 8.775 12C8.775 13.8 10.2 15.225 12 15.225C13.8 15.225 15.225 13.8 15.225 12C15.225 10.2 13.8 8.775 12 8.775ZM16.05 8.7C16.05 9.11421 15.7142 9.45 15.3 9.45C14.8858 9.45 14.55 9.11421 14.55 8.7C14.55 8.28578 14.8858 7.95 15.3 7.95C15.7142 7.95 16.05 8.28578 16.05 8.7Z" fill="#686A67"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0ZM9.45 5.775H14.55C15.225 5.85 15.675 5.925 16.05 6.075C16.5 6.3 16.8 6.45 17.175 6.825C17.55 7.2 17.775 7.575 17.925 7.95C18.075 8.325 18.225 8.775 18.225 9.45V14.55C18.15 15.225 18.075 15.675 17.925 16.05C17.7 16.5 17.55 16.8 17.175 17.175C16.8 17.55 16.425 17.775 16.05 17.925C15.675 18.075 15.225 18.225 14.55 18.225H9.45C8.775 18.15 8.325 18.075 7.95 17.925C7.5 17.7 7.2 17.55 6.825 17.175C6.45 16.8 6.225 16.425 6.075 16.05C5.925 15.675 5.775 15.225 5.775 14.55V9.45C5.85 8.775 5.925 8.325 6.075 7.95C6.3 7.5 6.45 7.2 6.825 6.825C7.2 6.45 7.575 6.225 7.95 6.075C8.325 5.925 8.775 5.775 9.45 5.775Z" fill="#686A67"/>
                    </svg>
                  </a>
                </div>
              </nav>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}