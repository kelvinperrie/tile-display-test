var PlayerModel = function() {
    var self =this;

    self.maxInventory = 3;
    self.inventory = [];

    self.credits = 10;

    self.Purchase = function(itemNumber, fromPerson) {
        if(self.inventory.length >= self.maxInventory) {
            return "No room in inventory";
        }
        let item = fromPerson.inventory[itemNumber-1];
        if(item.value > self.credits) {
            return "You can't afford it!";
        }

        fromPerson.inventory.splice(itemNumber-1, 1);  // take the item from the seller
        self.inventory.push(item);                     // add it to the player's inventory
        self.credits = self.credits - item.value;      // deduct credits from player

        return "It's yours!";
    };

    self.Sell = function(itemNumber) {
        if(self.inventory.length > itemNumber+1) {
            return "Don't have that many items!"
        }
        let item = self.inventory[itemNumber-1];
        
        self.inventory.splice(itemNumber-1, 1);
        self.credits = self.credits + item.value;

        return "Thanks!";
    };

    self.OutputInventory = function() {
        let output = ["Your inventory is:"];
        output = output.concat(self.GetInventory());
        if(output.length === 1) {
            output[0] = "You've got nothing in your inventory."
        }
        game.messageOutput.Output(output);
    };
    self.GetInventory = function() {
        let output = [];
        
        for(let i = 0; i < self.inventory.length; i++) {
            output.push((i+1) + " " + self.inventory[i].BuyDescription());
        }
        return output;
    };
};