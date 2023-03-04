import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../Utils/StateProvider'
import axios from "axios"
import { reducerCases } from "../Utils/Constants"


export default function Playlist() {

    const [{ token, playlists }, dispatch] = useStateProvider()

    useEffect(() => {

        const getPlayListData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                }
            )
            const { items } = response.data
            const playlists = items.map(({ name, id }) => {
                return { name, id }
            })
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
        }
        getPlayListData()

    }, [token, dispatch])
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };
    // console.log(playlists)
    return (
        <Container>
            <ul>
                {playlists &&
                    playlists.map(({ name, id }) => {
                        return (
                            <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
                        )

                    })}
            </ul>
        </Container>
    )
}



const Container = styled.div`
background-color:black;
height:100%;
overflow:hidden;

    ul{
        list-style-type: none;
        display:flex;
        flex-direction:column;
        gap:1rem;
        padding:0.5rem;
        height:52vh;    
        max-height:100%;
        overflow:auto;
        &::-webkit-scrollbar{
            width:0.7rem;
            &-thumb{
                background-color:rgba(255,255,255,0.6)
            }
        }
        li{
            display:flex;
            gap:1rem;
            cursor: pointer;
            transition:0.3s ease-in-out;
            &:hover{
                color:white;
            }
        }
    }

`
