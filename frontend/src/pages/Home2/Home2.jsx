import CourseList from "../../components/Home/Home";
import Hello from "../../components/Hello/Hello";

// Functional component
const Home = () => {
	const names = ["Athos", "Portos", "Aramis"]
	return (
		<main>
			<h2>Vous êtes sur la page Home</h2>
			{names.map(
				(prenom, index) => <Hello key={index} name={prenom} />
			)}
			<CourseList />
		</main>
	)
}

export default Home

