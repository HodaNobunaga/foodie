import React from 'react'

const CourseItem = (props) => {
	//const courseInfo = props.courseInfo
	const { courseInfo} = props
	return (
		<div className="flex flex-row justify-center font-serif ">
		<div className="w-1/3 ">
		<p className=" text-center font-bold py-12"	> {courseInfo.name}</p>
		<img className=" w-full rounded-lg" src={courseInfo.picture}/> 	
			<p className="py-5">Prix : {courseInfo.price}</p>
			<p className="text-justify"> Description : {courseInfo.description}</p>
			<div className=" text-center py-9"> <button className = "p-3 m-5 bg-green-300 font-bold" > Ajouter au panier </button></div>
		</div>
		</div>
		
	)
}

export default CourseItem
