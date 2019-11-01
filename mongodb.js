const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


const id = new ObjectID()
console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect')
    }

    console.log('Connected correctly')

    const db = client.db(databaseName)

    /*
    db.collection('users').insertOne({
        name: 'Kader',
        age:66
    }, (error, result) => {
        if (error) {
            return console.log('Error while inserting')
        }

        console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            name: 'Julia',
            age: 42
        }, {
            name: 'Max',
            age: 20
        }
    ], (error, result) => {

        if (error) {
            return console.log('Error while inserting')
        }

        console.log(result.ops)

    }) 

    db.collection('tasks').insertMany([
        {
            description: 'Cooking food',
            completed: false
        }, {
            description: 'Cleaning',
            completed: true
        }, {
            description: 'Learning',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Error while inserting')
        }

        console.log(result.ops)

    })

    db.collection('users').findOne({ name: 'Kader' }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch data')
        }

        console.log(user)

    })

    db.collection('users').find({ age: 20 }).toArray((error, users) => {
        if (error) {
            return console.log('Unable to fetch data')
        }

        console.log(users)

    })

    db.collection('tasks').findOne({  _id: new ObjectID("5db1c65dd9d1ac48a41cf595") }, (error, task) => {
        console.log(task)
    }) 

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    }) 

    db.collection('users').updateOne({
        _id: new ObjectID("5db1c65dd9d1ac48a41cf591")

    }, {
        $set: {
            name: 'Mike'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) 

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) 

    db.collection('users').deleteMany({
        age: 66
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    }) */

})