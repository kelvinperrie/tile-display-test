
var KeyProcessor = function(topLevel) {
    var self = this;

    self.topLevel = topLevel;
    self.keyProcessingChoice = KeyProcessingOptionMoving;   // tracks what we're doing; moving or talking

    // the talking processor will call this function when the player stops talking to someone
    self.stopTalkingTo = function(person) {
        person.inConversation = false;
        self.keyProcessingChoice = KeyProcessingOptionMoving;
    }

    // the command processor will call this function when the commands are given to start talking to someone
    self.startTalkingTo = function(person) {
        person.inConversation = true;
        self.keyProcessingChoice = KeyProcessingOptionTalking;
        self.talkingProcessor.SetPersonBeingTalkedTo(person);
    }

    self.ProcessKeyPress = function(event) {
        if(self.keyProcessingChoice == KeyProcessingOptionMoving) {
            self.commandProcessor.ProcessKeyPress(event.key);
        } else if(self.keyProcessingChoice == KeyProcessingOptionTalking) {
            self.talkingProcessor.ProcessKeyPress(event);
        }
    }

    self.commandProcessor = new CommandProcessor(self.topLevel, this, self.startTalkingTo);
    self.talkingProcessor = new TalkingProcessor(self.topLevel, this, self.stopTalkingTo);
}