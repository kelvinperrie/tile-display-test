
self.TalkingProcessor = function() {
    var self = this;

    self.saying = "";                                       // tracks the text entered so far
    self.personTalkingTo = null;                            // tracks the person being talked too
    //self.messageOutput = services["messageOutput"];

    self.SetPersonBeingTalkedTo = function(person) {
        self.personTalkingTo = person;
        let greeting = person.GetInitialGreeting();
        if(greeting) {
            self.MakeResponse(greeting);
        }
    }

    self.FindResponse = function(trigger) {
        if(trigger === "hello" || trigger === "hi") {
            // say the same greeting back
            self.MakeResponse(trigger);
        } else if(trigger === "bye") {
            self.MakeResponse("bye");
            self.personTalkingTo.StopTalkingTo();

            game.keyProcessor.stopTalkingTo(self.personTalkingTo);
            //self.stopTalkingToCallback(self.personTalkingTo);
            
        } else {
            var response = null;
            // check the trigger has some length, otherwise we will repsond to single character triggers due to our .contains check
            if(trigger && (trigger.length >= 2 || !(isNaN(trigger)))) {
                //console.log("checking for response to " + trigger)
                // check to see if this person wants to say anything back
                response = self.personTalkingTo.Ask(trigger);
            }
            if(response) {
                self.MakeResponse(response);
            } else {
                // the person didn't have a response for some reason ...
                self.MakeResponse("");
            }
        }
    }

    self.MakeResponse = function(response) {
        // is it a single line, or multiple?
        if(Array.isArray(response)) {
            game.messageOutput.Output(self.personTalkingTo.name + " said: ");
            for(let i = 0; i < response.length; i++) {
                game.messageOutput.Output(response[i]);
            }
        } else {
            game.messageOutput.Output(self.personTalkingTo.name + " said: " + response);
        }
    }

    self.ProcessKeyPress = function(event) {
        //console.log(event);
        if(event.keyCode === 13) {
            game.messageOutput.Output("Player said: " + self.saying);
            self.FindResponse(self.saying);
            self.saying = "";
        } else {
            self.saying = self.saying + event.key;
        }

    };
}