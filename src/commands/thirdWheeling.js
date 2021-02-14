const prespective = require('../../api/perspective')
const { less, medium, high, awk } = require('../comment');

module.exports = (client) => {
    const data_ = [];
    const time_ = []
    let avg = 0;
    client.on('message', function toBeClosed(message) {
        if (message.author.bot === true) return;
        prespective(message.content).then(data => {
            const t = data[0];
            data_.push(t);
            avg = (avg + t) / data_.length
            let rand = Math.floor(Math.random() * (8));
            console.log(avg);
            setTimeout(function () {
                try {
                    if (t) {
                        console.log(t);
                        if (avg > .80) {
                            message.channel.send(high[rand]);
                        } else if (avg > .55) {
                            message.channel.send(medium[rand])
                        } else if (avg > .25) {
                            message.channel.send(less[rand])
                        } else if (avg > .5) {
                            message.channel.send(awk[rand])
                        }
                    }
                } catch (error) {
                    console.log('fuck this error')
                }


            }, 2000);


        })
            .catch(error => {
                console.log(`ERROR: ${error}`);
            });
    })
}
