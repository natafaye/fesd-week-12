
// variables
let something = 0;
const unchangeable = 2 + 3;

// this variable has a function that can be called in it
// recipe
const myFunction = () => {

}

// The result of calling the function
// a pie tin with the results of following the recipe
const resultOfMyFunction = myFunction()


// boolean logic
// conditionals

const hungry = true;
const broke = true;

if(hungry && !broke) {
    alert("Go buy some food!")
}
else if(broke) {
    alert("Go make some money!")
}


// loops (while, for, for-of)

while(hungry) {
    alert("Eat something")
    // Without this line you will have an infinite loop
    hungry = false;
}

for(let i = 0; i < 3; i++) {
    alert("Eat something")
}

// arrays

const names = ["Natalie", "Samantha", "Jose"]

for(const name of names) {
    alert("hello " + name + "!")
}

// Does the same thing
names.forEach(name => alert("hello " + name + "!"))

const alverezFamily = names.map(name => name + " Alvarez")

const namesWithAnE = names.filter(name => name.includes("e"))

const firstNameStartsWithS = names.find(name => name[0] === "S")

// functions

function makeACake(color, flavor) {
    return color + " " + flavor + " cake"
}

const makeACake = (color, flavor) => {
    return color + " " + flavor + " cake"
}

const makeACake = (color, flavor) => color + " " + flavor + " cake"

const makeACake = flavor => flavor + " cake"

// objects

const posts = [
    {
        id: 0,
        author: {
            firstName: "Natalie",
            lastName: "Childs"
        },
        text: "What's up",
        comments: [
            {
                id: 0,
                text: "I hate this post"
            },
            {
                id: 1,
                text: "Me too"
            }
        ]
    },
    {
        id: 0,
        firstName: {
            firstName: "Natalie",
            lastName: "Childs"
        },
        text: "What's up",
        comments: [
            {
                id: 0,
                text: "I hate this post"
            },
            {
                id: 1,
                text: "Me too"
            }
        ]
    }
]

// Object Oriented Programming - classes

class Animal {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

const fluffy = new Animal("Fluffy", "cat")

// const fluffy = {
//     name: "Fluffy",
//     type: "cat"
// }

class Cat extends Animal {
    constructor(catName) {
        super(catName, "cat")

        // this.name = catName
        // this.type = "cat"
    }
}

const fluffyCat = new Cat("Fluffy", "cat")

// const fluffyCat = {
//     name: "Fluffy",
//     type: "cat"
// }