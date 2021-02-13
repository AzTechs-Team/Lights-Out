const { DMChannel,Client, User, Message } = require("discord.js");
const profile = require('../../DB/profileSchema');
const questionsList = require('../questions.json');

let tempInfo = [];

class LightsOn{
    constructor(client,user,id){
        this.client = client;
        this.user = user;
        this.id = id;
        this.temp = [];
        this.reducto = () => {
            var arr = this.temp;
            var object = arr.reduce(
            (obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
            console.log('done2');
            console.log(object);
        }
        this.questions = () => {
                let i = 0
                let profileList = ['intro','name','gender', 'age', 'preferences', 'agerange','bio', 'relationship', 'song',
                    'pizza', 'superhero', 'food', 'language', 'philosophy', 'software']
                //let tempInfo = []
                let temp = [];
                const tempId = this.id;
                const tempClient = this.client;
                tempClient.on('message', async function toBeClosed(msg) {
                    try{
                        if (msg.author.bot === true) return;
                        if (msg.author.id === tempId)
                        {   
                            if(i === 0 && msg.content != 'yes') {
                                    msg.author.send('Update some other time!')
                                    try{
                                        tempClient.removeListener('message', toBeClosed);
                                        console.log('done');
                                    }catch(err){console.log(`didnt close : ${err}`);}
                            }
                            else if (i < profileList.length || msg.content === 'yes') {
                                try{ await msg.author.send(questionsList[i])}catch(err){console.log(err);}
                            
                                let key = profileList[i];
                                tempInfo.push({ [key]: String(msg.content).toLocaleLowerCase() });
                                console.log(tempInfo[i]);
                                if (i == profileList.length-1) {
                                    console.log('close', i)
                                    try{
                                        tempClient.removeListener('message', toBeClosed);
                                        console.log('done');
                                        //console.log("intro: ",tempInfo[0].intro);

                                        console.log(typeof tempInfo);
                                        dataoutput(tempInfo);
                                            
                                    }catch(err){console.log(`didnt close : ${err}`);}
                                    //console.log(tempInfo);
                                }
                                    //temp = tempInfo;
                                    //return tempInfo;
                                    //this.reducto(tempInfo);
                            }
                        }
                            i += 1;
        
                    }catch(err){console.log(err);}
                })
        }
    }
    
    // questions() {
    //     let i = 0
    //     let profileList = ['intro','name', 'age', 'preferences', 'age-range','bio', 'relationship', 'song',
    //         'pizza', 'superhero', 'food', 'language', 'philosophy', 'software']
    //     let tempInfo = []
    //     let temp = [];
    //     const tempId = this.id;
    //     const tempClient = this.client;
    //     tempClient.on('message', async function toBeClosed(msg) {
    //         try{
    //             if (msg.author.bot === true) return;
    //             if (msg.author.id === tempId)
    //             {   
    //                 if(i === 0 && msg.content != 'yes') {
    //                         msg.author.send('Update some other time!')
    //                         try{
    //                             tempClient.removeListener('message', toBeClosed);
    //                             console.log('done');
    //                         }catch(err){console.log(`didnt close : ${err}`);}
    //                 }
    //                 else if (i < profileList.length || msg.content === 'yes') {
    //                     try{ await msg.author.send(questionsList[i])}catch(err){console.log(err);}
    //                     let key = profileList[i];
    //                     tempInfo.push({ [key]: String(msg.content).toLocaleLowerCase() });
    //                     console.log(tempInfo[i]);
    //                     if (i == profileList.length-1) {
    //                         console.log('close', i)
    //                         try{
    //                             tempClient.removeListener('message', toBeClosed);
    //                             console.log('done');
    //                         }catch(err){console.log(`didnt close : ${err}`);}
    //                         console.log(tempInfo);
    //                         temp = tempInfo;
    //                         return tempInfo;
    //                         //this.reducto(tempInfo);
    //                     }
    //                     i += 1;
    //                 }
    //             }
    //         }catch(err){console.log(err);}
    //     })
    // }
}

function dataoutput(tempInfo) {
    console.log(tempInfo, 'asd');
    let arr = tempInfo;
    const object_ = Object.assign({}, ...arr);
    console.log(object_);
}

module.exports = LightsOn;