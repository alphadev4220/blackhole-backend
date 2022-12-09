
module.exports = (mongoose) => {
  const Collection = mongoose.model(
    "Collection",
    mongoose.Schema(
      {
        denomId: String,
        name: String,
        artist: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      },
      { timestamps: true }
    )
  );

  return Collection;
}
