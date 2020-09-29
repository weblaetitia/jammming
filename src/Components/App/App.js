import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [
        {
        name: 'Tiny Dancer', 
        artist: 'Elton John', 
        album: 'Madman Across The Water', 
        id: 1
      }, 
      {
        name: 'Heart Shapped Box', 
        artist: 'Nirvana', 
        album: 'In Utero', 
        id: 2
      }, 
      {
        name: 'Today', 
        artist: 'Smashing Pumpinks', 
        album: 'Siames Dream', 
        id: 3
      }
    ],
    playlistName: 'My new Playlist',
    playlistTracks: [
      {
        name: 'Hurt', 
        artist: 'Nine inch Nails', 
        album: 'The downward siral', 
        id: 10
      }, 
      {
        name: 'The Beautifull People', 
        artist: 'Marylin Manson', 
        album: 'antichrist superstar', 
        id: 11
      }, 
      {
        name: 'Passenger', 
        artist: 'Deftones', 
        album: 'White Pony', 
        id: 12
      }
    ]
    }
    // binders
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }



  addTrack(track) {
    let tempTracks = this.state.playlistTracks
    if (tempTracks.find(saveTrack => saveTrack.id === track.id )) {
      return // meens don't do anything else
    } 
    tempTracks.push(track)
    this.setState({playlistTracks: tempTracks})
  }

  removeTrack(track) {
    let tempTracklist = this.state.playlistTracks.filter(element => element.id !== track.id)
    this.setState({playlistTracks: tempTracklist})
  }

  updatePlaylistName(newName) {
    this.setState( {playlistName: newName} )
  }

  savePlaylist() {
    let tracksURIs = this.playlistTracks.map(track => track.uri )
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
                      onNameChange={this.updatePlaylistName}
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onsave={this.savePlaylist} />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
