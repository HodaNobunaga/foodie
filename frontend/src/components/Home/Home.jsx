import { useState, useEffect } from "react"
import CourseItem from "../CourseItem/CourseItem";

const Home = () => {
	const [courses, setCourses] = useState([]) //methode qui renvoit un tableau
	// let courses = []

	useEffect( () => {
		fetchFrenchCourses()
	}, [] )
	const fetchFrenchCourses = async () => {
		const response = await fetch('http://127.0.0.1:4000/courses')
		const data = await response.json() //converti ma reponse
		console.log(data) //je récupere ma data
		setCourses(data)
	}

	return (
		<section>
			
		 <div className="text-center">
		 
		 </div>
			<div >
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
