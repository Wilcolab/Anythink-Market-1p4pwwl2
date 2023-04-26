//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require("mongoose")



if (!process.env.MONGODB_URI) {
    console.warn("Missing MONGODB_URI in env, please add it to your .env file");
  }
  
const connection = process.env.MONGODB_URI;
mongoose.connect(connection);

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

async function seedDatabase() {
    for(let i = 0; i < 100; i++){
        const user = { username: `User${i}`, email: `User${i}@emaill.com`};
        const options  = { upsert: true, new: true };
        const createdUser = User.findOneAndUpdate(user, {}, options);

        // add item to user
        const item = {
            slug: `slug${i}`,
            title: `title ${i}`,
            description: `description ${i}`,
            seller: createdUser
        };

        const createdItem = await Item.findOneAndUpdate(item, {}, options);

        // add comments to item
        if (!createItem?.comments?.length) {
            let commentIds = [];
            for (let j = 0; j < 100; j++) {
                const comment = new Comment({
                    body: `body ${j}`,
                    sellet: createdUser,
                    item: createdItem
                });

                await comment.save();
                commentIds.push(comment._id);
            }

            createdItem.comments = commentIds;
            await createdItem.save();
        }
        
    }
}

seedDatabase()
.then(() => {
    console.log("Finish DB seeding");
    process.exit(0);
})
.catch((err) => {
    console.log(`Error while running DB seed:
    ${err.message}`);
    process.exit(1);
});