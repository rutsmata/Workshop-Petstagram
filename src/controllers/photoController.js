const router = require("express").Router();

const photoManager = require("../managers/photoManager");
const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/", async (req, res) => {
  const photos = await photoManager.getAll().lean(); // 2. photos comes awaited from a function getAll which has to be created within photoManager

  res.render("photos/catalog", { photos }); // 1. second parameter is added upon completion of dynamic logic. In oder to test for the message for empty photos, we could {photos: []}
});

//extra parameter for auhenticated/logged users; if not authenticated - error is not verified
router.get("/create", isAuth, (req, res) => {
  res.render("photos/create");
});

router.post("/create", isAuth, async (req, res) => {
  //get data from both the body and the user, such as all data from the body and owner data from the user. Owner has the same word as in the Photo Model
  const photoData = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await photoManager.create(photoData);

    res.redirect("/photos"); // redirects to the catalog page
  } catch (err) {
    res.render("photos/create", { error: getErrorMessage(err) });
  }
});

router.get("/:photoId/details", async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManager.getOne(photoId).lean();
  const isOwner = req.user?._id == photo.owner._id; // prepare a const to keep if the logged-in user is an owner of the photo, to be used in details logic.
  //The ? is optional chaining, e.g if the request has no user (e.g at browsing only) to still working properly and not to crash
  // alternative is user?._id === owner.toString()

  res.render("photos/details", { photo, isOwner }); // isOwner is provided as second parameter in order to be cascaded to the template
});

router.get("/:photoId/delete", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  try {
    await photoManager.delete(photoId);
    res.redirect("/photos"); // redirect to catalog page
  } catch (err) {
    res.render("photos/details", { error: "Unsuccessful deletion!" });
  }
});

router.get("/:photoId/edit", isAuth, async (req, res) => {
  const photo = await photoManager.getOne(req.params.photoId).lean();

  res.render("photos/edit", { photo }); // second parameter in order to have pre-filled the edit data
});

router.post("/:photoId/edit", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photoData = req.body;

  try {
    await photoManager.edit(photoId, photoData);

    res.redirect(`/photos/${photoId}/details`); // as per the requirements: current photo post details page
  } catch (err) {
    res.render("photos/edit", {
      error: "Unable to update photo",
      ...photoData,
    }); // second parameter to pre-fill the data
  }
});

// activate if needed
// router.post("/:photoId/comments", isAuth, async (req, res) => {
//   const photoId = req.params.photoId;
//   const { message } = req.body;
//   const user = req.user._id;

//   await photoManager.addcomment(photoId, {user, message});

//   res.redirect(`/photos/${photoId}/details`);
// });

module.exports = router;
