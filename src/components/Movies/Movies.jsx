import React, { useEffect, useState } from "react";

import './styles.css';

export const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [descri, setDescri] = useState('none');
    const [date, setDate] = useState('none');
    const [note, setNote] = useState('none');
    const [descriText, setDescriText] = useState('Mostrar Descrição');
    const [dateText, setDateText] = useState('Mostrar Data de Lançamento');
    const [noteText, setNoteText] = useState('Mostrar NOtas');
    const [page, setPage] = useState(1);


    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`)
        .then(res => res.json())
        .then(json => setMovies(json.results))
    }

    const showDescri = () => {
        if(descri === 'none'){
            setDescri('block');
            setDescriText('Ocultar Descrição')
        }else{
            setDescri('none');
            setDescriText('Mostrar Descrição')
        }
    }

    const showNote = () => {
        if(note === 'none'){
            setNote('block');
            setNoteText('Ocultar Notas')
        }else{
            setNote('none');
            setNoteText('Mostrar Notas')
        }
    }

    const showDate = () => {
        if(date === 'none'){
            setDate('block');
            setDateText('Ocultar Data de Lançamento')
        }else{
            setDate('none');
            setDateText('Mostrar Data de lançamento')
        }
    }


    const handleClick = () => {
        console.log(page)
        if(page === 20){
            setPage((s) => s);
            console.log(page)
        }else{
            setPage((s) => s + 1);
            console.log(page)
        }
    }
    const handleClickMenos = () => {
        if(page === 1){
            setPage((s) => s);
            console.log(page)
        }else{
            setPage((s) => s - 1);
            console.log(page)
        }
    }

    useEffect(() => {
        getMovie();
    // eslint-disable-next-line
    }, [page])


    return(
        <div className="full">
            <header>
                <h1>Bem-Vindo(a). <br />
                Explore os melhores filmes e séries para você assistir.</h1>
                <div className="search">
                    <input type="search" name="busca" id="busca" placeholder="Busque por filmes ou séries..."/>
                </div>
                <div className="options">
                    <button onClick={showDescri}>{descriText}</button>
                    <button onClick={showNote}>{noteText}</button>
                    <button onClick={showDate}>{dateText}</button>
                </div>
            </header>
            <div className="container-movies" translate="pt-br">
                {movies.map((movie) => (
                    <div key={movie.id} className="card">
                        <div className="img">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movies"/>
                        </div>
                            <div className="description" >
                            <h1 title={movie.original_title}>{movie.original_title}</h1>
                            <p style={{display: descri}}>{movie.overview}</p>
                            <h3 style={{display: note, color: 'yellow'}}>{movie.vote_average} <span style={{color: '#bbb'}}>({movie.vote_count})</span></h3>
                            <p style={{display: date}}>{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pages">
                <button onClick={handleClickMenos}>Antes</button>
                <h1>{page}</h1>
                <button onClick={handleClick}>Próximo</button>
            </div>
        </div>
    )
}