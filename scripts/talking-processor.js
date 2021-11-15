
self.TalkingProcessor = function(topLevel, keyProcessor, stopTalkingToCallback) {
    var self = this;

    self.topLevel = topLevel;
    self.keyProcessor = keyProcessor;
    self.saying = "";
    self.personTalkingTo = null;
    self.stopTalkingToCallback = stopTalkingToCallback;
    self.confusedResponses = ["Uuuhh ...", "...", "Sorry?", "I don't know anything about that"];

    self.SetPersonBeingTalkedTo = function(person) {
        self.personTalkingTo = person;
    }

    self.FindResponse = function(trigger) {
        if(trigger === "hello" || trigger === "hi") {
            // say the same greeting back
            self.MakeResponse(trigger);
        } else if(trigger === "bye") {
            self.MakeResponse("bye");
            self.stopTalkingToCallback(self.personTalkingTo);
            
        } else {
            var response = null;
            // check the trigger has some length, otherwise we will repsond to single character triggers due to our .contains check
            if(trigger && trigger.length >= 3) {
                // check to see if this person wants to say anything back
                response = self.personTalkingTo.Ask(trigger);
            }
            if(response) {
                self.MakeResponse(response);
            } else {
                // the person didn't have a trigger
                self.MakeResponse(self.GetConfusedResponse());
            }
        }
    }

    self.GetConfusedResponse = function() {
        var rando = randomIntFromInterval(0, self.confusedResponses.length - 1)
        return self.confusedResponses[rando];
    }

    self.MakeResponse = function(response) {
        console.log(self.personTalkingTo.name + " said: " + response);
    }

    self.ProcessKeyPress = function(event) {
        //console.log(event);
        if(event.keyCode === 13) {
            console.log("Player said: " + self.saying);
            self.FindResponse(self.saying);
            self.saying = "";
        } else {
            self.saying = self.saying + event.key;
        }

    };
}