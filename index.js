const axios = require('axios');
const querystring = require('querystring');
const parseString = require('xml2js').parseString;

class ShoutcastTranscoder {
    constructor(options) {
        this.options = options;
        this.checkOptions();
    }

    checkOptions() {
        this.options.username = this.options.username || 'admin';
        this.options.password = this.options.password || 'goaway';
        this.options.host = this.options.host || 'localhost';
        this.options.port = this.options.port || 7999;

        if (this.options.username === 'admin' && this.options.password == 'goaway') {
            console.warn('[Security Warning] You should change username and password from config file of sc_trans server.')
        }
    }

    getParams(op, seq, extra) {
        return Object.assign({}, {
            op: op,
            seq: seq
        }, extra);
    }

    getAuth() {
        return {
            username: this.options.username,
            password: this.options.password
        };
    }

    parseOptions(obj) {
        if (obj instanceof Array) {
            return (obj.length > 1) ? obj : obj[0];
        } else {
            return obj;
        }
    }

    parseJson(obj) {
        if(obj instanceof Array) {
            obj = this.parseOptions(obj);
        }
        if (obj instanceof Object) {
            for (let index in obj) {
                obj[index] = this.parseJson(obj[index]);
            }
        }
        return obj;
    };

    getApiEndpoint() {
        return `http://${this.options.host}:${this.options.port}/api`;
    }

    fetch(endpoint, extra = {}, seq = '0') {
        return axios.post(this.getApiEndpoint(), querystring.stringify(this.getParams(endpoint, seq, extra)), {
            auth: this.getAuth(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            return new Promise((resolve, reject) => parseString(response.data, (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result);
                    }
                })); 
        }).then(json => this.parseJson(json));
    }

    getStatus(){
        return this.fetch('getstatus');
    }
    getOptions(){
        return this.fetch('getoptions');
    }
    getEndpoints(){
        return this.fetch('getendpoints');
    }
    setEndpoint(params){
        return this.fetch('setendpoint', params);
    }
    deleteEndpoint(params){
        return this.fetch('deleteendpoint', params);
    }
    logData(){
        return this.fetch('logdata');
    }
    addPlaylist(params){
        return this.fetch('addplaylist', params);
    }
    listPlaylist(){
        return this.fetch('listplaylists');
    }
    playlistData(params){
        return this.fetch('playlistdata', params);
    }
    deletePlaylist(params){
        return this.fetch('deleteplaylist', params);
    }
    listEvents(){
        return this.fetch('listevents');
    }
    addEvent(params){
        return this.fetch('addevent', params);
    }
    deleteEvent(params){
        return this.fetch('deleteevent', params);
    }
    abortEvent(params){
        return this.fetch('abortevent', params);
    }
    listDjs(params){
        return this.fetch('listdjs', params);
    }
    deleteDj(params){
        return this.fetch('deletedj', params);
    }
    addDj(params){
        return this.fetch('adddj', params);
    }
    modifyDj(params){
        return this.fetch('modifydj', params);
    }
    kickDj(params){
        return this.fetch('kickdj', params);
    }
    unkickDj(params){
        return this.fetch('unkickdj', params);
    }
    nextTrack(){
        return this.fetch('nexttrack');
    }
    capture(active){
        return this.fetch('capture', { state: (active) ? 'on' : 'off' });
    }
    restart(){
        return this.fetch('restart');
    }
    quit(){
        return this.fetch('quit');
    }


}

module.exports = ShoutcastTranscoder;