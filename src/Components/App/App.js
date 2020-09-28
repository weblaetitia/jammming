import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
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
    playlistName: 'My Playlist',
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
  }



  addTrack(track) {
    let tempTracks = this.state.playlistTracks
    if (tempTracks.find(saveTrack => saveTrack.id === track.id )) {
      return // meens don't do anything else
    } 
    tempTracks.push(track)
    this.setState({playlistTracks: tempTracks})
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
