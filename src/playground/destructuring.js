const person = {
    name: 'Andrew',
    age: 26,
    location: {
        city: 'Philadelphia',
        temp: 92
    }
}

const {name = 'Anonymous', age} = person; //Anonymous is a default value if there is no value

//const name = person.name;
//const age = person.age;

console.log(`${name} is ${age}.`);

const {city: town, temp: temptature} = person.location; //renaming temp & city

if(city && temptature) {
    console.log(`It's ${temptature} in ${city}`);
}


const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const {name: publisherName = 'Self-Published'} = book.publisher; //setting default value AND renaming

console.log(publisherName);


//ARRAY DESTRUCTURING

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

const [street, city, state, zip] = address; //matching it up according to position in above array
//you don't need to create local variables for every item in the array

console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, ,mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);