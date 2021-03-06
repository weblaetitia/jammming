import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {

  constructor(props) {
    super(props)
    // binders
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  handleClickSave() {
    this.props.onSave()
  }

  render() {
    return (
      <div className="Playlist">
          <input defaultValue={this.props.playlistName} onChange={this.handleNameChange} />
          <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
          <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist;
