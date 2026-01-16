import { createContext, useState, useContext, type ReactNode } from 'react';
import type { Pokemon } from '../types/PokemonType';

interface PokemonContextProps {
    pokemons: Pokemon[];
    setPokemons: (pokemons: Pokemon[]) => void;
    addPokemon: (newPokemon: Pokemon) => void;
    removePokemon: (id: number) => void;
}

const PokemonContext = createContext<PokemonContextProps>({
    pokemons: [],
    setPokemons: () => {},
    addPokemon: () => {},
    removePokemon: () => {},
});

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const addPokemon = (newPokemon: Pokemon) => {
        setPokemons(prev => [...prev, newPokemon]);
    };

    const removePokemon = (id: number) => {
        setPokemons(prev => prev.filter(p => p.pokemonId !== id));
    };

    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons, addPokemon, removePokemon}}>
            {children}
        </PokemonContext.Provider>
    );
};

