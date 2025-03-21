import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import md5 from 'md5';

const CharacterDetails = () => {
    const { id } = useParams(); 
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const publicKey = 'ec8cd50207b6932df648feaaf3cc1471';
        const privateKey = '24677de941af50e791e16d99cfc913c5a5b97dd8';
        const ts = 1; 
        const hash = md5(ts + privateKey + publicKey);

        const fetchCharacterDetails = async () => {
            try {
                const url = `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
        
                console.log('Character Request URL:', url);

                const response = await axios.get(url);
                setCharacter(response.data.data.results[0]);
            } catch (err) {
                if (err.response) {
                    console.error('Character Error Response:', err.response);
                    setError(`API Error: ${err.response.status} - ${err.response.data.message}`);
                } else if (err.request) {
                    console.error('Character Error Request:', err.request);
                    setError('No response from the API');
                } else {
                    console.error('Character Error Message:', err.message);
                    setError('Error occurred while fetching character details');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>{character.name}</h2>
            <p>{character.description || 'No description available.'}</p>
            <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
            />
        </div>
    );
};

export default CharacterDetails;
