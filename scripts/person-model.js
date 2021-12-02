var PersonModel = function(name, initialGreeting, wordTriggers, image, inventory) {
    var self = this;

    self.name = name;
    self.initialGreeting = initialGreeting;
    self.wordTriggers = wordTriggers;
    self.image = image;
    self.buying = false;                        // track if the player has said they want to buy
    self.inventory = inventory;
    self.confusedResponses = ["Uuuhh ...", "...", "Sorry?", "I don't know anything about that"];

    self.GetInitialGreeting = function() {
        return self.initialGreeting;
    }
    self.StopTalkingTo = function() {
        self.buying = false;
    }
    self.CanTalkTo = function() {
        return self.wordTriggers!==null;
    }
    self.TryToPurchase = function(itemNumber) {
        console.log("trying to purchase item " + itemNumber);
        if(isNaN(itemNumber)) {
            return "What?";
        }
        if(itemNumber < 1 || itemNumber >= self.inventory.length+1) {
            return "Uh?";
        }
        //var player = GetService("player");
        let response = game.player.Purchase(itemNumber, self);
        self.buying = false;
        return response;
    }
    self.Ask = function(trigger) {
        if(self.buying) {
            return self.TryToPurchase(trigger);
        }
        if(trigger.toLowerCase() === 'buy') {
            // todo not everyone will be selling
            self.buying = true;
            return self.GetInventory();
        }
        if(!trigger || !self.wordTriggers) return null;
        let triggers = trigger.split(" ");
        for(let t = 0; t < triggers.length; t++) {
            let wordToTest = triggers[t];
            for(let i = 0; i < self.wordTriggers.length; i++) {
                if(self.wordTriggers[i].trigger && self.wordTriggers[i].trigger.toLowerCase().includes(wordToTest.toLowerCase())) {
                    return self.wordTriggers[i].response;
                }
            }
        }
        // if we get to here then there was no appropriate response
        return self.GetConfusedResponse();
    }

    self.GetConfusedResponse = function() {
        var rando = randomIntFromInterval(0, self.confusedResponses.length - 1)
        return self.confusedResponses[rando];
    }

    self.GetInventory = function() {
        if(!self.inventory || self.inventory.length === 0) return "I haven't got anything.";
        let output = ["This is what I have:"];
        for(let i = 0; i < self.inventory.length; i++) {
            output.push((i+1) + " " + self.inventory[i].BuyDescription());
        }
        output.push("What number do you want to buy?");
        return output;
    }
};
