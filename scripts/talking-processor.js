
self.TalkingProcessor = function(topLevel, keyProcessor, stopTalkingToCallback) {
    var self = this;

    self.topLevel = topLevel;
    self.keyProcessor = keyProcessor;
    self.saying = "";
    self.personTalkingTo = null;
    self.stopTalkingToCallback = stopTalkingToCallback;

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
            // check to see if this person wants to say anything back

        }
    }

    self.MakeResponse = function(response) {
        console.log(self.personTalkingTo.name + " said " + response);
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