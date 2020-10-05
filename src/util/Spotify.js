import CLIENT_ID from './clientID';

let accessToken;
let expiresIn;

const clientID = CLIENT_ID
console.log(clientID)

const redirectURI = 'http://localhost:3000/';




const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    search(term) {
        accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
            headers: {Authorization: `Bearer ${accessToken}`} 
    }).then(rawRsponse => {
            return rawRsponse.json()
        }).then(response => {
            return response.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(name, tracksUris) {
        if (!name || tracksUris.length === 0 ) {
            return;
        }

        accessToken = Spotify.getAccessToken();
        const myHeaders = { headers: {Authorization: `Bearer ${accessToken}`} }
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, { headers: myHeaders } 
        ).then(rawResponse => {
            return rawResponse.json()
        }).then(response => {
            userID = response.id
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
            { 
                headers: myHeaders,
                method: 'POST',
                body: JSON.stringify( { name: name} )
            }).then(rawResponse => rawResponse.json())
            .then(response => {
                const playlistID = response.id
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, 
                { 
                    headers: myHeaders,
                    method: 'POST',
                    body: JSON.stringify( { uris: tracksUris} )
                })
            })

        })
    },

    // async search(term) {
    //     await Spotify.getAccessToken()
    //     let rawResponse = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: {Authorization: `Bearer ${accessToken}`} })
    //     let response = await rawResponse.json()
    //     // console.log(response.tracks.items)
        
    //     const tracks = response.tracks.items.map(track => {
    //         return ({
    //             id: track.id,
    //             name: track.name,
    //             artist: track.artists[0].name,
    //             album: track.album.name,
    //             uri: track.uri

    //         })
    //     })
    // }, 
}


export default Spotify;
