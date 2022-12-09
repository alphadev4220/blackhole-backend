
module.exports = (mongoose) => {
  const User = mongoose.model(
    "User",
    mongoose.Schema(
      {
        address: String,
        username: String,
        avatar: String,
        banner: String,
        email: String,
        discord: String,
        telegram: String,
        instagram: String,
        website: String,
        userBio: String,
        nft_count: Number
      },
      { timestamps: true }
    )
  );

  return User;
}
