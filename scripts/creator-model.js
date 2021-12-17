
var CreatorModel = function() {
    var self = this;

    self.availableTiles = ko.observableArray();
    self.selectedAvailableTile = ko.observable();

    self.selectedAvailableTileImage = ko.computed(function() {
        if(self.selectedAvailableTile()) {
            return self.selectedAvailableTile().image;
        }
        return null;
    });

    self.SetSelectedAvailableTile = function(tile) {
        console.log("setting selected tile to ")
        console.log(tile);
        self.selectedAvailableTile(tile);
    };

    self.PopulateAvailableTiles = function() {

        self.availableTiles.push({image: "brick01.png", passable: false})
        self.availableTiles.push({image: "pavement01.png", passable: false})
        self.availableTiles.push({image: "pavement02.png", passable: false})

    };

    self.GenerateMapJson = function() {
        var output = "";
        for(var r = 0; r < game.tilesModel.rows.length; r++) {
            var row = game.tilesModel.rows[r];
            for(var c = 0; c < row.length; c++) {
                //console.log("looking at row " + r + " col " + c);
                //output += "looking at row " + r + " col " + c;
                if(row[c].hasDefinition) {

                    var imageText = "";
                    if(row[c].imageSet) {
                        imageText = ',image:"'+row[c].image+'"';
                    }
                    var flagsText = "";
                    if("passable" in row[c]) {
                        flagsText += ',passable:'+row[c].passable;// self.rows[tile.x][tile.y].passable = tile.passable;
                    }
                    if("climbable" in row[c]) {
                        flagsText += ',climbable:'+row[c].climbable;//self.rows[tile.x][tile.y].climbable = tile.climbable;
                    }
                    var personText = "";
                    if("person" in row[c] && row[c].person) {
                        // , person: { 
                        //     name: "Matt", 
                        //     intro: "Hi friend, lookin' to buy?",
                        //     talkTriggers: [{ trigger : "test", response: "Yeah, your test worked :)" },{ trigger : "second", response: "Your second test is ok" }],
                        //     image: "person01.png",
                        //     inventory: [
                        //         { name: "Blaster", type: "weapon", damage: 5, charge: 20, cost: 5 },
                        //         { name: "Blaster", type: "weapon", damage: 6, charge: 25, cost: 6 }
                        //     ]
                        // }
                        var person = row[c].person;
                        // var talkTriggersText = "";

                        // var inventoryText = "inventory:[";
                        // for(var i =0;i < person.inventory.length; i++) {
                        //     var invItem = person.inventory[i].Serialize();
                        //     if(i > 0) {
                        //         inventoryText += ","+ invItem;
                        //     } else {
                        //         inventoryText +=  invItem;
                        //     }
                        // }
                        // inventoryText += "]";

                        personText = `,person:${person.Serialize()}}`;

                    }

                    var tileText = `{x:${c},y:${r}${imageText}${flagsText}${personText}}`;
                    output+=tileText;
                }
            }
        }
        console.log(output);
    }

    self.Initialize = function() {
        self.PopulateAvailableTiles();
    }
    self.Initialize();
};