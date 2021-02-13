const { DMChannel,Client, User, Message } = require("discord.js");
const profile = require('../../DB/profileSchema');
const questionsList = require('../questions.json');

class LightsOn{
    constructor(client,user,id){
        this.client = client;
        this.user = user;
        this.id = id;
        this.temp = {}
    }

    questions() {
        let i = 0
        let profileList = ['intro','name', 'age', 'preferences', 'bio', 'relationship', 'song',
            'pizza', 'superhero', 'food', 'language', 'philosophy', 'software']
        let tempInfo = []
        const tempId = this.id;
        this.client.on('message', function toBeClosed(msg) {
            if (msg.author.id === tempId)
            {
                if (msg.author.bot === true) return;
                if (i <= 12) {
                    msg.author.send(questionsList[i])
                    let key = profileList[i];
                    tempInfo.push({ [key]: msg.content });
                    console.log(tempInfo)
                }
                if (i == profileList.length) {
                    console.log('close', i)
                    this.client.removeListener('message', toBeClosed);
                    console.log(tempInfo)
                }
                i += 1;
            }
            
        }) 
        
        
    }
}

// module.exports = (message,client) => {
//     const author = new LightsOn(message, client);
//     author.send();
//     author.fun();
//     //    client.on('message', (messageAuthor))
// };

module.exports = LightsOn;