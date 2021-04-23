import { useState } from "react"
import CourseItem from "../CourseItem/CourseItem";


const Home = () => {
	const [courses, setCourses] = useState([]) //methode qui renvoit un tableau
	// let courses = []

	const fetchCourses = async () => {
		const response = await fetch('http://127.0.0.1:4000/courses')
		const data = await response.json() //converti ma reponse
		console.log(data) //je récupere ma data
		setCourses(data)
	}

	return (
		<section>
			<h2 style = {{ textAlign : "center "}}>Nos plats</h2>
		 <div style = {{ textAlign : "center "}}>
		 <button style = {{ padding : "5px 13px "}}   onClick={fetchCourses}>Découvrez nos plats</button>
		

		 </div>
			<div  style = {{ display : "flex", flexDirection : "row", flexWrap: "wrap"}}  >
				{
					courses.map(course => {
						return <CourseItem courseInfo={course} />
					})
				}
			</div>
		</section>
	)
}

export default Home
