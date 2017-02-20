# Shoutcast Transcoder API Wrapper
Shoutcast Transcoder Node.Js module that allows to interact with your own sc_trans server.

## Install
npm install --save shoutcast-transcoder

## Usage
```javascript
const ShoutcastTranscoder = require('shoutcast-transcoder');
const scTrans = new ShoutcastTranscoder({
    host: 'localhost',
		port: 7999,
		username: 'admin',
		password: 'goaway'
});

scTrans.getStatus().then(response => console.log(JSON.stringify(response, null, 2)));

```

## Documentation

All endpoints returns a promise with JSON parsed response. You can see the API Specs in [SHOUTcast Transcoder AJAX API Specification](http://wiki.winamp.com/wiki/SHOUTcast_Transcoder_AJAX_api_Specification).

### Available endpoints:

#### getStatus()
#### getOptions()
#### getEndpoints()
#### setEndpoint(params)
* Params: *Object*
	* name: *name of encoder. Created if it does not exist*
  * encoder: *type of encoder (mp3 or aacp)*
  * bitrate: *encoder bitrate*
  * samplerate: *encoder sample rate*
  * channels: *encoder channels*
  * quality: *quality value for mp3*
  * mode: *mode for mp3*
  * protocol: *numeric protocol value for network connection*
  * ip: *address for network connection*
  * port: *port for network connection*
  * password: *password for SHOUTcast network connection*
  * streamid: *uvox stream id*
  * userid: *uvox user id*
  * auth: *uvox authorization*
  * radiometadata: *radio metadata flag*
  * newmetadata: *new metadata flag*

#### deleteEndpoint(params)
* Params: *Object*
	* name: *name of the endpoint*
	
#### logData()
#### addPlaylist(params)
* Params: *Object*
    * name: *name for playlist.*
    * format: *"list|file"*
    * filename: *name of referenced file*
    * calcrg: *1|0*
    * entry: *inline entries*

#### listPlaylist()
#### playlistData(params)
* Params: *Object*
    * name: *name for playlist.*
    * format: *"list|file"*
    * filename: *name of referenced file*
    * calcrg: *1|0*
    * entry: *inline entries*

#### deletePlaylist(params)
* Params: *Object*
    * name: *name for playlist.*
    * max: *max # of entries to return (optional)*
    * page: *page of data (zero based, requires "max") (optional)*

#### listEvents()
#### addEvent(params)
* Params: *Object*
    * type: *'dj' or 'relay' or 'playlist'*
    * name: *name of the dj or playlist*
    * url: *url for relay*
    * startdate: *startdate for schedule (optional)*
    * enddate: *enddate for schedule (optional)*
    * starttime: *starttime for schedule (optional)*
    * duration: *duration for schedule (optional)*
    * repeat: *repeat value for schedule (optional)*
    * loopatend: *playlists only. 1 to loop playlist until event is over. (Default 0)*
    * shuffle: *playlists only. 1 - shuffle, 0 - no shuffle, inherit - use config file flag (Default: inherit)*
    * priority: *playlist and relay only number > 0. Used to resolve conflicting playlist or relay events. (Default 1)*
    * archive: *djs only. 1 - archive 0 - no archive, inherit - use config file flag*

#### deleteEvent(params)
* Params: *Object*
    * id: *id of the event*

#### abortEvent(params)
* Params: *Object*
    * id: *id of the event*

#### listDjs(params)
* Params: *Object*
    * name: *name of specific dj (optional)*

#### deleteDj(params)
* Params: *Object*
    * name: *name of dj*

#### addDj(params)
* Params: *Object*
    * name: *name of dj*
    * password: *dj password*
    * priority: *integer priority value*

#### modifyDj(params)
* Params: *Object*
    * name: *name of dj*
    * password: *dj password*
    * priority: *integer priority value*

#### kickDj(params)
* Params: *Object*
    * duration: *amount of time dj is banned (in hh:mm:ss)*
    * name: *name of dj to kick (optional. default is current dj)*

#### unkickDj(params)
* Params: *Object*
    * name: *name of dj*

#### nextTrack()
#### capture(active)
* Params
	* active: *Boolean*

#### restart()
#### quit()