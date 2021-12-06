
var MessageOutput = function() {
    var self = this;

    self.Output = function(message) {
        // is it a single line, or multiple?
        if(Array.isArray(message)) {
            for(let i = 0; i < message.length; i++) {
                console.log(message[i]);
            }
        } else {
            console.log(message);
        }
    };
};