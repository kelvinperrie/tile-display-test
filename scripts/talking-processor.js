
self.TalkingProcessor = function(topLevel, keyProcessor, stopTalkingToCallback) {
    var self = this;

    self.topLevel = topLevel;
    self.keyProcessor = keyProcessor;
    self.saying = "";                                       // tracks the text entered so far
    self.personTalkingTo = null;                            // tracks the person being talked too
    self.stopTalkingToCallback = stopTalkingToCallback;     // method to call when talking is completed
    self.messageOutput = services["messageOutput"];

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
            self.stopTalkingToCallback(self.personTalkingTo);
            
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
            self.messageOutput.Output(self.personTalkingTo.name + " said: ");
            for(let i = 0; i < response.length; i++) {
                self.messageOutput.Output(response[i]);
            }
        } else {
            self.messageOutput.Output(self.personTalkingTo.name + " said: " + response);
        }
    }

    self.ProcessKeyPress = function(event) {
        //console.log(event);
        if(event.keyCode === 13) {
            self.messageOutput.Output("Player said: " + self.saying);
            self.FindResponse(self.saying);
            self.saying = "";
        } else {
            self.saying = self.saying + event.key;
        }

    };
}