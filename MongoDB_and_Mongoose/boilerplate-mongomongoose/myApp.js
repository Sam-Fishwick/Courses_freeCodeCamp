require('dotenv').config();
let mongoose = require('mongoose');

let my_uri = 'mongodb+srv://fishers93:' + process.env.PW + 
'@cluster0.68cfdem.mongodb.net/db0?retryWrites=true&w=majority';
mongoose.connect(my_uri, { useNewUrlParser: true, useUnifiedTopology: true });

let peopleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String],
});

let Person = mongoose.model('Person', peopleSchema);

const createAndSavePerson = (done) => {

    let emily = new Person({
            name: 'Emily',
            age: 27, 
            favoriteFoods: ['Strawberries', 'Paella']});

    emily.save((error, data) => {
        if (error) return done(error);
        done(null, data);
    });
    //done(null /*, data*/);
};

let arrayOfPeople = [
    {name: 'John', age: 18, favoriteFoods: ['Burger', 'Fries']},
    {name: 'Stacey', age: 34, favoriteFoods: ['Pizza','Tiramasu']},
    {name: 'Gregg', age: 25, favoriteFoods: ['Pie', 'Fanta']}
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (error, data) => {
        if(error) return done(error);
        done(null, data);
    });
    //done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (error, data) => {
        if(error) return done(error);
        done(null, data);
    });
    //done(null /*, data*/);
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (error, data) => {
        if(error) return done(error);
        done(null, data);
    });
    //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    Person.findById({_id: personId}, (error, data) => {
        if(error) return done(error);
        done(null, data);
    });
    //done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById({_id: personId}, (error, data) => {
        if(error) return done(error);
        data.favoriteFoods.push(foodToAdd);
        data.save((error, data) => {
            if(error) return done(error);
            done(null, data);
        });
    });
    //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
