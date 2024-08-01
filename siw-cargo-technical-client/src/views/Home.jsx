import Perfil from "./Perfil";
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