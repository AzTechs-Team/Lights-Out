const { Client } =  require("discord.js");
class lightson{
    constructor(message, client){
        this.message = message;
        this.client = client;
        this.toBeSent = "Do you want to start match making the process?";
    }
    send(){
        this.message.content.send(toBeSent);
    }
    fun(){
        this.client.on('message',(messageAuthor) => {
            messageAuthor.channel.send('first question!')            
        })
    }
}

module.exports = (message) => {
    const author = new lightson(message, client);
    author.send();
    author.fun();
    //    client.on('message', (messageAuthor))
};