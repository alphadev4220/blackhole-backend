const db = require("../../db");
const Collections = db.Collection;
var ObjectId = require('mongodb').ObjectID;

exports.create = (req, res) => {
    const artist = req.body.artist;
    const user = new Collections({
        denomId: req.body.denomId,
        name: req.body.name,
        artist: ObjectId(artist)
    });
    //avoid re - resistering     
    Collections.find({ denomId: req.body.denomId }, function (err, docs) {
        if (err) {
            return res.status(501).send({ success: false, message: "Internal Server Error." });
        }
        if (docs.length > 0) {
            return res.status(501).send({ success: false, message: "This collection has been already registered." });
        } else {
            user.save(function (err) {
                if (!err)
                    return res.status(200).send({ success: true, message: "Successfully added new collection." });
                else
                    return res.status(501).send({ success: false, message: "Cannot add new collection." });
            });
        }
    })
}

exports.findAll = (req, res) => {
    const skip = req.query.skip;
    const limit = req.query.limit;
    Collections.find().populate("artist").skip(skip ? skip : 0).limit(limit ? limit : 10)
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving tutorials.",
            });
        });
}

exports.findOne = (req, res) => {
    const denomId = req.query.denomId;
    Collections.findOne({ denomId })
        .then((data) => {
            if (!data) {
                return res
                    .status(404)
                    .send({ message: "Not found collection with denomId " + denomId });
            } else {
                return res.send(data);
            }
        })
        .catch((err) => {
            return res.status(500)
                .send({ message: "Error retrieving collection with denomId = " + denomId });
        });
}

exports.update = (req, res) => {
    Collections.updateOne(
        {
            denomId: req.params.id
        },
        {
            $set: {
                ...req.body
            }
        }, 
        { upsert: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: `Cannot update collection. Maybe collection was not found.`,
                });
            } else return res.status(200).send({
                success: true,
                message: "Successfully updated the collection."
            });
        })
        .catch((err) => {
            console.log("User updating error : ", err);
            return res.status(500).send({
                success: false,
                message: "Error updating User "
            });
        });
}

exports.delete = (req, res) => {
    const denomId = req.params.id;
    Collections.findOne({ denomId })
        .then((data) => {
            if (!data) {
                return res
                    .status(404)
                    .send({ message: "Not found collection with denomId " + denomId });
            } else {
                Collections.findByIdAndRemove(data._id)
                    .then((data) => {
                        if (!data) {
                            return res.status(404).send({
                                message: `Cannot delete collection with id = ${data._id}. Maybe collection was not found.`,
                            });
                        } else {
                            return res.send({
                                message: "collection was deleted successfully!",
                            });
                        }
                    })
                    .catch((err) => {
                        return res.status(500).send({
                            message: "Could not delete collection with id = " + data._id,
                        });
                    });
            }
        })
        .catch((err) => {
            return res.status(500)
                .send({ message: "Error retrieving collection with denomId = " + denomId });
        });


}