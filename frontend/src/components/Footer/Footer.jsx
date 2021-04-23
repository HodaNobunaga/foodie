import React from 'react'
import styles from './Footer.module.css' // import css 
import {
    Link 
} from 'react-router-dom'




const Footer= () => {
    return (
        <footer className= {styles.footer}> 

            <ul>
            <h2 className = "font-bold text-lg	 ">Découvrir Foodie</h2>
                <li>Vente à emporter</li>
                <li>Menus</li>
                <li>Voir plus</li>
            </ul>
            <ul>
            <h2 className = "font-bold text-lg	">Mentions légales</h2>
                <li>Mentions légales</li>
                <li>Confidentialité</li>
                <li>Cookies</li>
            </ul>
            
            <ul>
            <h2 className = "font-bold text-lg	">Liens utiles</h2>
            <li><Link to="/Form">Nous contacter</Link></li>
                <li>Types de cuisine</li>
                <li> <Link to ="/">Newsletter</Link> </li>
                <li> <Link to ="/">Plan du site</Link> </li>

              </ul>
              
            <div >
                <h2 className = "font-bold text-lg	 ">Ne ratez rien de nos nouveautés</h2>
                <div className= "flex flex-row justify-around pt-5">
                <p><i class="fab fa-facebook fa-2x"></i></p>
                <p><i class="fab fa-instagram fa-2x"></i></p>
                <p><i class="fab fa-twitter fa-2x"></i></p>
                <p> <i class="fab fa-pinterest fa-2x"></i></p>
                </div>
            </div>
            
        </footer>
       
    )
}

export default Footer
