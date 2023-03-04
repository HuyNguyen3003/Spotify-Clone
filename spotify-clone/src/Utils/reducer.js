import { reducerCases } from "./Constants"

export const initialState = {
    token: null,
    playlists: [],
    userInfor: null,
    selectedPlaylistId: "7fUGgBMY0b6CDAg1FpsJ7G",
    selectedPlaylist: null

}

const reducer = (state, action) => {
    switch (action.type) {

        case reducerCases.SET_TOKEN: {

            return {
                ...state,
                token: action.token
            }
        }
        case reducerCases.SET_PLAYLISTS: {


            return {
                ...state,
                playlists: action.playlists
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfor: action.userInfor
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                selectedPlaylist: action.Playlist
            }
        }
        default:
            return state
    }
}

export default reducer