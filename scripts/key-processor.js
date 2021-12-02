
var KeyProcessor = function() {
    var self = this;

    // self.commandProcessor = GetService("commandProcessor");
    // self.talkingProcessor = GetService("talkingProcessor");

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
        game.talkingProcessor.SetPersonBeingTalkedTo(person);
    }

    self.ProcessKeyPress = function(event) {
        if(self.keyProcessingChoice == KeyProcessingOptionMoving) {
            game.commandProcessor.ProcessKeyPress(event.key);
        } else if(self.keyProcessingChoice == KeyProcessingOptionTalking) {
            game.talkingProcessor.ProcessKeyPress(event);
        }
    }

    // self.commandProcessor = new CommandProcessor();
    // self.talkingProcessor = new TalkingProcessor();

}