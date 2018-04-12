import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Song } from '../../interfaces/song';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class FirebaseProvider {
  // songs: AngularFireList<Song>;
  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  /**
   * Generates a room with the generated roomId on the Firebase.
   * @param roomId  a string of numbers and alphabets unique to each room
   */
  genRoom(roomId) {
    this.afDB.database.ref('/').child('rooms').child(roomId).set({id: roomId});
  }

  /**
   * Getter for the list of rooms from the Firebase
   * @returns {AngularFireList<T>}
   */
  getRoomDir() {
    return this.afDB.list('/rooms/');
  }

  /**
   * Getter for the list of songs from the Firebase
   * @param roomCode
   * @returns {AngularFireList<Song[]>}
   */
  getAngularSongList(roomCode) {
    return this.afDB.list<Song []>('/rooms/'+roomCode+'/songs');
  }

  /**
   * Converts an AngularFireList of songs to an array and returns it.
   * @param roomCode
   * @returns {Array}
   */
  getSongList(roomCode) {
    let angularSongList = this.getAngularSongList(roomCode)

    let songList = [];
    let i = 0;
    angularSongList.valueChanges()
      .subscribe(list =>{
        list.forEach(song => {
          songList[i] = song;
          console.log("I is: "+ i); //DEBUG
          i++;
        });
      });
    console.log("about to return song list: ");
    console.log(songList);
    return songList;
  }



  /**
   * Generates room with the roomCode
   * @param roomCode
   */
  pushRoom(roomCode) {
    this.afDB.list('/rooms/').push(roomCode);
  }

  /**
   * Push the song that the user provided
   * @param song - a Song object
   * @param roomId - roomId of the room that the host or the quest is in
   */
  pushSong(song, roomId){
    let promise = this.afDB.list("rooms/"+roomId+"/songs").push(song);
    song.fbKey = promise.key;
    this.afDB.database.ref('/').child('rooms').child(roomId).child('songs').child(promise.key).update({fbKey: promise.key});
    console.log("Attempted to push: " + song.title);
    return promise;
  }

  /**
    * Updates the up or down votes in firebase
    * @param song - a Song object
    * @param roomId - ID of current room
    * @param isUpVote - boolean, true if the vote is an upvote, false if down vote
    */
  updateVote(song, roomId, isUpVote){
    // TODO: Get this to access the song given by the push id created by firebase
    if(isUpVote) {
      // this.afDB.database.ref('/').child('rooms').child(roomId).child('songs').child(song.title).child('votes').transaction(function (currentVotes) {
      //   return (currentVotes || 0) + 1;
      // });
    }else{
      console.log(song.fbKey);
      console.log(this.afDB.database.ref('/').child('rooms').child(roomId).child('songs').child(song.fbKey));
      //console.log("song " + this.afDB.database.ref('/rooms/'+roomId+'/songs').child(song.fbKey));
      // this.afDB.database.ref('/').child('rooms').child(roomId).child('songs').child(song.fbKey).child('votes').transaction(function(currentVotes) {
      //   return (currentVotes || 0) - 1;
      // });
    }
  }

  /**
   * Deletes the room when the party is over.
   * @param roomId
   */
  deleteRoom(roomId) {
    // TODO: Complete this method
    const roomRef = this.afDB.database.ref('/').child('rooms').child(roomId);
    console.log("roomId: "+ roomId + " roomRef on deleteRoom: "+ roomRef);
    roomRef.remove();
  }

  /**
   * Deletes the specified song from the unique room.
   * @param songName  - user input of the song name
   * @param roomCode  - user input of the room code
   */
  deleteSong(songName, roomCode) {
    // TODO: Complete this method
  }

  /**
   * fetches a list of roomCodes (roomIds) that would be used to verify if the
   * user is trying to enter the correct room
   * @returns {any[]} - a list of room ids
   */
  getRoomIdList() {
    //fetches a list of roomCodes (roomIds) that would be used to verify if the
    //user is trying to enter the correct room
    let i = 0;
    let idList = [];
    this.afDB.list("/rooms").valueChanges()
      .subscribe(list =>{
        list.forEach(item => {
          idList[i] = item['id'];
          i++;
        });
      });
    return idList;
  }

}
