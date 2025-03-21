import { useParams } from 'react-router-dom';

const CharacterDetails = () => {
    const { id } = useParams();
    return (
        <div> 
            <h2>Character Details</h2>
            <p>Displaing information for character with ID: {id}</p>
        </div>
    );
};

export default CharacterDetails;