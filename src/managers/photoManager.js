const Photo = require("../models/Photo");

exports.getAll = () => Photo.find().populate("owner"); //2. upon dynamic logic ready; Populate is important to be able to get the owner's details (as per the User Model), needed in the petPhoto.hbs

exports.getOne = (photoId) => Photo.findById(photoId).populate("owner"); //3. upon details page - get one db element by Id

exports.create = (photoData) => Photo.create(photoData); //1. to store in db

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId); // 4. upon delete functionality

exports.edit = (photoId, photoData) =>
  Photo.findByIdAndUpdate(photoId, photoData); // 5. upon edit - extract a certain photo and edit its data

// activate if needed
// exports.addComment = async (photoId, commentData) => {
//   const photo = await Photo.findById(photoId);

//   photo.comments.push(commentData);

//   return photo.save()
// };

exports.getByOwner = (userId) => Photo.find({ owner: userId }); // find those where owner = userId; get all photos of this owner
