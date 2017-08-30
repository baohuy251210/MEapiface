var login = require("facebook-chat-api");
var answeredThreads = {};
var Greet = 'I am (Core).\n You can leave messages here ';
var Morning = 'Have a good morning, ';
var Sleep = 'I am sleeping, you should sleep too !! :D ';
var Afternoon = 'Good Afternoon, you can take a snap now :D ';
var Rest = 'Have a nice rest of the day :D';
var Evening = 'Good evening! I may have been eating right now ';
var Night = 'Goodnight, have a nice dream !!! ';
login({
    email: getAccess.email(),
    password: getAccess.password()
}, function callback(err, api) {
    if (err) return console.error(err);
    api.getFriendsList((err, data) => {
        if(err) return console.error(err);

        console.log(data.length);
    });
    api.listen(function callback(err, message) {
        var d = new Date();
        var h = d.getHours();
        if (!answeredThreads.hasOwnProperty(message.threadID)) {
            api.getUserInfo(message.senderID, function(err, ret) {
                //
                //
                if (err) return console.error(err);
                for (var prop in ret) {
                    // Gender
                    if (ret[prop].gender == 2) {
                        var sex = 'Sir';
                    } else var sex = 'Madam';
                    //
                    //Greet
                    if (ret.hasOwnProperty(prop) && ret[prop].name) {
                        api.sendMessage("Core: Hi "+sex+ "! " + ret[prop].name + ",Cyot told me to hold this \n calling him. \n Wait! it'll be fast :D", prop);
                        api.sendMessage(Greet, prop);
                        if (h >= 5 && h <= 10) {
                            api.sendMessage(Morning, prop);
                        } else
                        if (h > 0 && h < 5) {
                            api.sendMessage(Sleep, prop);
                        } else
                        if (h > 10 && h <= 15) {
                            api.sendMessage(Afternoon, prop);
                        } else
                        if (h > 15 && h <= 18) {
                            api.sendMessage(Rest, prop);
                        } else
                        if (h > 18 && h <= 21) {
                            api.sendMessage(Evening, prop);
                        } else
                        if (h >= 22 && h <= 23) {
                            api.sendMessage(Night, prop);
                        }
                        //isfriend
                        if (!ret[prop].isFriend) {
                            api.sendMessage("Core: :'( Why don't you be my friend " + ret[prop].name + " :'(", prop)
                        } else 
                            if(ret[prop].isFriend){
                                api.sendMessage("Core: Oh! I could know you are my friend " + ret[prop].name + " :D ")
                            }
                        //end is friend
                        //isBirthday
                        if (ret.hasOwnProperty(prop) &&ret[prop].isBirthday) {
                            api.sendMessage("Happy birthday now :)", prop);
                        }
                        //end isBirthday
                        answeredThreads[message.threadID] = true;
                    }
                    // end greet
                }
            });
        }
    });
});