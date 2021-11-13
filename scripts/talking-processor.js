
self.TalkingProcessor = function(topLevel, keyProcessor) {
    var self = this;

    self.topLevel = topLevel;
    self.keyProcessor = keyProcessor;
    self.saying = "";

    self.ProcessKeyPress = function(key) {
        self.saying = self.saying + key;
        console.log(self.saying);
    };
}