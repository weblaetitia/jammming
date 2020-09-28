import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {


  render() {
    if (this.props.tracks) {
      var myList = this.props.tracks.map(track => {
        return <Track id={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
      })
    }
    return (
      <div className="TrackList">
      { myList }
      </div>
    )
  }
}

export default TrackList;

