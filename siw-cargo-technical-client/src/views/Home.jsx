import Perfil from "../components/Perfil.jsx/Perfil";
import { useParams } from "react-router-dom";


const Home = () => {
    const { id } = useParams();


    return (
        <>
            <Perfil
                id={id}
            />

        </>
    )
}

export default Home;