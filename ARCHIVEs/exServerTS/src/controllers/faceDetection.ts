import { Input, Model } from "clarifai-nodejs";

export const detectFace = (req, res) => {
  const input = Input.getInputFromUrl({
    inputId: "test-image",
    imageUrl: "https://samples.clarifai.com/celebrity.jpeg",
  });

  const model = new Model({
    authConfig: {
      pat: process.env.CLARIFAI_PAT!,
      userId: process.env.CLARIFAI_USER_ID!,
      appId: process.env.CLARIFAI_APP_ID!,
    },
    modelId: "celebrity-face-recognition",
  });

  model
    .predict({
      inputs: [input],
    })
    .then((response) => {
      const result = response?.[0].data?.conceptsList[0].name ?? "unrecognized";
      console.log(result);
    })
    .catch(console.error);
};

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json("Invalid Form Submission...!");
  }
  db("users")
    .where({ id })
    .returning("entries")
    .increment("entries", 1)
    .then((entries) => {
      entries.length
        ? res.json(entries[0].entries)
        : res.status(400).json("Entry not found...!");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json("Error updating entries...");
    });
};
