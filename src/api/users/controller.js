const db = require("../../db");
const Users = db.User;
var ObjectId = require('mongodb').ObjectID;

exports.create = (req, res) => {
    const user = new Users({
        address: req.body.address,
        username: req.body.username,
        avatar: req.body.avatar,
        banner: req.body.banner,
        email: req.body.email,
        discord: req.body.discord,
        telegram: req.body.telegram,
        instagram: req.body.instagram,
        website: req.body.website,
        userBio: req.body.userBio
    });
    //avoid re - resistering     
    Users.find({ address: req.body.address }, function (err, docs) {
        if (err) {
            return res.status(501).send({ success: false, message: "Internal Server Error." });
        }
        if (docs.length > 0) {
            return res.status(501).send({ success: false, message: "This account has been already registered." });
        } else {
            user.save(function (err) {
                if (!err)
                    return res.status(200).send({ success: true, message: "Successfully created a new author" });
                else
                    return res.status(501).send({ success: false, message: "Cannot create a new author" });
            });
        }
    })
}

exports.findAll = (req, res) => {
    const skip = req.query.skip;
    const limit = req.query.limit;
    Users.find({"nft_count": {"$gt": 0}}).skip(skip ? skip : 0).limit(limit ? limit : 10)
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
    const address = req.query.address;
    Users.findOne({ address: address })
        .then((data) => {
            if (!data) {
                return res
                    .status(404)
                    .send({ message: "Not found User with address " + address });
            } else {
                return res.send(data);
            }
        })
        .catch((err) => {
            return res.status(500)
                .send({ message: "Error retrieving User with address = " + address });
        });
}

exports.update = (req, res) => {
    Users.findByIdAndUpdate(
        ObjectId(req.params.id),
        {
            ...req.body
        }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: `Cannot update User. Maybe User was not found.`,
                });
            } else return res.status(200).send({
                success: true,
                message: "Successfully updated the profile."
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

exports.updateCount = (req, res) => {
    Users.findByIdAndUpdate(
        ObjectId(req.params.id),
        {
            nft_count: Number(req.body.count)
        }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: `Cannot update count. Maybe User was not found.`,
                });
            } else return res.status(200).send({
                success: true,
                message: "Successfully updated the count."
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
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete User with id = ${id}. Maybe User was not found.`,
                });
            } else {
                return res.send({
                    message: "User was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Could not delete User with id = " + id,
            });
        });
}

exports.deleteAll = (req, res) => {
    Users.deleteMany({})
        .then((data) => {
            return res.send({
                message: `${data.deletedCount} Users were deleted succesfully!`,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Some error occurred while removing all Users.",
            });
        });
};