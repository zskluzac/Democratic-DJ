import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../../interfaces/song';

/*
  Generated class for the SessionDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionDataProvider {

  roomCode: string;
  songList: Song[];
  hostBoolean: boolean;

  constructor(public http: HttpClient) {
    console.log('Hello SessionDataProvider Provider');
  }

  isHost() {
    return this.hostBoolean
  }

  setHost(hostBoolean) {
    this.hostBoolean = hostBoolean;
  }

  getRoomCode() {
    return this.roomCode;
  }

  setRoomCode(roomCodeIn) {
    this.roomCode = roomCodeIn;
  }

  getSongList() {
    return this.songList;
  }

  addToLocalSongList(newSong) {
    // this.songList.add(newSong);
  }

}
