import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components"
import Body from './Body'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useStateProvider } from '../Utils/StateProvider'
import { reducerCases } from "../Utils/Constants"
import axios from 'axios'



export default function Spotify() {

    const [{ token }, dispatch] = useStateProvider()

    const bodyRef = useRef()
    const [navBackground, setnavBackground] = useState(false)
    const [headerBackground, setheaderBackground] = useState(false)
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >=
            30 ? setnavBackground(true) : setnavBackground(false)
        bodyRef.current.scrollTop >=
            286 ? setheaderBackground(true) : setheaderBackground(false)
    }

    useEffect(() => {

        const getUserInfor = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            })
            const userInfor = {
                userId: data.id,
                userName: data.display_name,
            }
            dispatch({ type: reducerCases.SET_USER, userInfor })
        }
        getUserInfor()


    }, [dispatch, token])

    return (
        <Container>
            <div className="spotify_body">
                <Sidebar />
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackground={navBackground} />
                    <div className="body_contents">
                        <Body headerBackground={headerBackground} />
                    </div>
                </div>
            </div>
            <div className="spotify_fotter">
                <Footer />
            </div>
        </Container>
    )
}



const Container = styled.div`
    max-width:100vw;
    max-height:100vh;
    overflow:hidden;
    display:grid;
    grid-template-rows:85vh 15vh;

.spotify_body{
    display:grid;
    grid-template-columns:35vh 65vh;
    height:100%;
    width:100%;
    background:linear-gradient(transparent, rgba(0,0,0,1));
    background-color:rgb(32,87,100);
    .body{
        height:100%;
        width:100vw;
        overflow:auto;
    }


}


`