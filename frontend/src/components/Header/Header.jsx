
  import styles from './Header.module.css'
  
  
  const Header = () => {
    return (
      
      <header className={styles.header}>
        
        <nav role="navigation" className="bg-green-500" >
          <div className={styles.menuToggle}>
  
            <input type="checkbox" />
  
            <span></span>
            <span></span>
            <span></span>
  
            <ul className={styles.menu}>
              <li>
                <a to="/">
                  <img src="logo.png" alt="Logo" />
                </a>
                <hr className="mt-10 h-1 bg-gray-200"></hr>
              </li> 
              <li>
              <li><button type="button" className="bg-indigo-600 rounded p-3 text-white">Inscription / Connexion</button></li>
              {/* <a to="/"className="text-gray-500 hover:text-purple-700 hover:text-xl">Inscription ou Connexion</a> */}
              </li>
              
              <li className="text-gray-500 font-medium hover:text-indigo-600" >
                <a to="/form" >Contact</a>
              </li>
            </ul>
          </div>
  
          <ul className={styles.menu2} inline-block shadow-lg>
            <li ><button className=" ">Connexion</button>
            </li>
            <li><button type="button" className="">Valider</button></li>
  
            <li class="">Inscription</li>
            <li class="">Menu</li>
          </ul>
        </nav >
        
      </header>
    )
  }
  
  export default Header
  