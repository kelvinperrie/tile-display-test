var MovementProcessor = function(topLevel, keyProcessor) {
    var self = this;

    self.topLevel = topLevel;
    self.keyProcessor = keyProcessor;
    self.movementIncrement = 0; // 1 or 2 depending on walking or running
    self.running = false;
    self.climbing = false;
    self.talking = false;

    self.ProcessKeyPress = function(key) {

        if(self.talking) {
            let talkingToX = self.topLevel.currentX;
            let talkingToY = self.topLevel.currentY;
            if(key === 'w') {
                talkingToY = talkingToY - 1;
            } else if(key === 'a') {
                talkingToX = talkingToX - 1;
            } else if(key === 's') {
                talkingToY = talkingToY + 1;
            } else if(key === 'd') {
                talkingToX = talkingToX + 1;
            } else {
                // got to talk to a direction, bail out
                self.talking = false;
                return;
            }
            let tileTalking = self.topLevel.GetTileAt(talkingToX,talkingToY);
            if(tileTalking.person && tileTalking.person.canTalkTo) {
                tileTalking.person.inConversation = true;
                self.keyProcessor.keyProcessingChoice = KeyProcessingOptionTalking;
                self.talking = false;
            }
            return;
        }

        let movingToX = self.topLevel.currentX;
        let movingToY = self.topLevel.currentY;

        self.movementIncrement = self.running ? 2 : 1;

        // when running we move two tiles - we need to get the tile between where we currently are
        // and where we going, to confirm it is something we can pass through
        let tileSkipping = null;
        let skippingX = self.topLevel.currentX;
        let skippingY = self.topLevel.currentY;
        if(self.running) {
            
            if(key === 'w') {
                skippingY = skippingY - 1;
            } else if(key === 'a') {
                skippingX = skippingX - 1;
            } else if(key === 's') {
                skippingY = skippingY + 1;
            } else if(key === 'd') {
                skippingX = skippingX + 1;
            }
            tileSkipping = self.topLevel.GetTileAt(skippingX,skippingY);
            // if we can't pass over this tile then we crash/stop running
            if(tileSkipping && tileSkipping.IsPassable()) {

            } else {
                self.running = false;
                return;
            }
        }

        let isMoving = false;
        if(key === 'w') {
            movingToY = movingToY - self.movementIncrement;
            isMoving = true;
        } else if(key === 'a') {
            movingToX = movingToX - self.movementIncrement;
            isMoving = true;
        } else if(key === 's') {
            movingToY = movingToY + self.movementIncrement;
            isMoving = true;
        } else if(key === 'd') {
            movingToX = movingToX + self.movementIncrement;
            isMoving = true;
        } else if(key === 'r') {
            self.running = !self.running;
        } else if(key === 'c') {
            self.climbing = true;
            // starting climbing stops you running
            self.running = false;
        } else if(key === 't') {
            self.talking = true;
            self.running = false;
            self.climbing = false;
        }

        // if the key press was intended to generate movement then we see if can move
        // is there a tile in that direction at all?
        // if so, is it one that we can move onto?
        if(isMoving) {
            var moveToTile = self.topLevel.GetTileAt(movingToX,movingToY);

            if(moveToTile) {
                if(moveToTile.IsPassable()) {
                    self.topLevel.currentX = movingToX;
                    self.topLevel.currentY = movingToY;
                    self.climbing = false;
                } else if(moveToTile.IsClimbable() && self.climbing) {
                    self.topLevel.currentX = movingToX;
                    self.topLevel.currentY = movingToY;
                    self.climbing = false;
                } else {
                    // if we're running and we crash when trying to go to the second step, stop us on the first step instead
                    if(self.running) {
                        self.topLevel.currentX = skippingX;
                        self.topLevel.currentY = skippingY;
                        self.running = false;
                    }
                }
            } else {
                // they tried to move off the edge of the world <<madness>>
                self.climbing = false;
                if(self.running) {
                    self.topLevel.currentX = skippingX;
                    self.topLevel.currentY = skippingY;
                    self.running = false;
                }
            }
        }

    };
}