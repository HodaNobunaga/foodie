import React from 'react'
import styles from './Category.module.css'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Category = () => {
    return (
        <div style = {{ display : "flex", flexDirection : "row", flexWrap: "wrap"}}>
            <div className= {styles.american}> American </div>
            <div className={styles.frenchy}> Frenchy</div>
            <div className={styles.oriental}> Oriental</div>
            <div className ={styles.japanese}> Japanese</div>
        </div>
    )
}

export default Category
