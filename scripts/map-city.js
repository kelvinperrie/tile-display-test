var maps = {};

maps.city = {
    defaultImage : "pavement01.png",
    maxX : 1000,
    maxY : 1000,
    tiles: [
        {
            x: 5, y: 5, image: "pavement02.png"
        },
        {
            x:0, y:0, image: "brick01.png", passable: false
        },
        {
            x:5, y: 19, image: "brick01.png", passable: false, climbable: true
        },
        {
            x:3,y:15, person: { 
                name: "Matt", 
                intro: "Hi friend, lookin' to buy?",
                talkTriggers: [{ trigger : "test", response: "Yeah, your test worked :)" },{ trigger : "second", response: "Your second test is ok" }],
                image: "person01.png",
                inventory: [
                    { name: "Blaster", type: "weapon", damage: 5, charge: 20, cost: 5 },
                    { name: "Blaster", type: "weapon", damage: 6, charge: 25, cost: 6 }
                ]
            }
        },
        {
            x:8,y:5, person: { 
                name: "Kyle", 
                buyer: true,
                intro: "Hi friend, lookin' to sell?",
                talkTriggers: [{ trigger : "how are you", response: "Great, thanks for asking" }],
                image: "person01.png",
                inventory: []
            }
        }
    ]

}
