import React from 'react'
import styles from './Form.module.css'

const Form = props => {
    return (
        <form className={styles.form}>
           <h2>Formulaire de contact </h2>

		   <h5>Votre Nom</h5>
		   <input type="text"/> <br/>

		   <h5>Votre prénom</h5>
		   <input type="text" name="prenom" value="" /><br/>
           
		   <h5>Votre message</h5>
		   <textarea name="le-message" rows="6" cols="40">Vous pouvez saisir ici un message.</textarea> <br/>
		   <input type="submit" value="Envoyer" /> 

	    </form>
    )
}

export default Form
