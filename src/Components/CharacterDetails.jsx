import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const publicKey = '7506d082e367c9cac09df81ee1378932';
        const privateKey = 'fcdd03d88322a2e638d96cce393c78aa53a87997';
        const ts = new Date().getTime();
        const hash = md5(ts + privateKey + publicKey);

        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(
                    `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`
                );
                const data = await response.json();
                setCharacter(data.data.results[0]);
            } catch (err) {
                setError('Failed to fetch character details');
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
