var PersonModel = function(name, initialGreeting, wordTriggers, image, inventory) {
    var self = this;

    self.name = name;
    self.initialGreeting = initialGreeting;
    self.wordTriggers = wordTriggers;
    self.image = image;
    self.buyer = false;                         // flag indicating if this person buy things from the player
    self.selling = false;                       // track if the player has said they want to sell
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
    // the player is trying to purchase something from this person
    self.TryToPurchase = function(itemNumber) {
        console.log("trying to purchase item " + itemNumber);
        self.buying = false;
        if(isNaN(itemNumber)) {
            return "What?";
        }
        if(itemNumber < 1 || itemNumber >= self.inventory.length+1) {
            return "Uh?";
        }
        //var player = GetService("player");
        let response = game.player.Purchase(itemNumber, self);
        return response;
    }
    // the player is trying to sell to this person
    self.TryToSell = function(itemNumber) {

        self.selling = false;

        let response = game.player.Sell(itemNumber);
        return response;

    }
    self.Ask = function(trigger) {
        if(self.buying) {
            return self.TryToPurchase(trigger);
        }
        if(self.selling) {
            return self.TryToSell(trigger);
        }
        if(trigger.toLowerCase() === 'buy') {       // the player wants to buy some stuff
            // todo not everyone will be selling
            self.buying = true;
            return self.GetInventory();
        }
        if(trigger.toLowerCase() === 'sell') {      // the player wants to sell some stuff
            if(self.buyer) {
                self.selling = true;
                // show the players inventory
                if(game.player.inventory.length === 0) {
                    return "You don't have anything to sell."
                }
                let output = ["What do you want to sell?"];
                
                return output.concat(game.player.GetInventory());
            }
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
        if(!self.inventory || self.inventory.length === 0) { 
            self.buying = false;
            return "I haven't got anything.";
        }
        let output = ["This is what I have:"];
        for(let i = 0; i < self.inventory.length; i++) {
            output.push((i+1) + " " + self.inventory[i].BuyDescription());
        }
        output.push("What number do you want to buy?");
        return output;
    }

    self.Serialize = function() {
        var person = self;
        var talkTriggersText = "talkTriggers:";
        // talkTriggers: [{ trigger : "test", response: "Yeah, your test worked :)" },{ trigger : "second", response: "Your second test is ok" }],
        talkTriggersText += JSON.stringify(person.wordTriggers);
        talkTriggersText += "";

        var inventoryText = "inventory:[";
        for(var i =0;i < person.inventory.length; i++) {
            var invItem = person.inventory[i].Serialize();
            if(i > 0) {
                inventoryText += ","+ invItem;
            } else {
                inventoryText +=  invItem;
            }
        }
        inventoryText += "]";

        personText = `{name:"${person.name}",intro:"${person.initialGreeting}",${talkTriggersText},image:${person.image},${inventoryText}}`;

        return personText;
    };
};
