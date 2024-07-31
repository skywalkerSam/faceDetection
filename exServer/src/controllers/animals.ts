import Chance from "chance";

const chance = new Chance();

export const getAnimals = (req, res) => {
  const animals = [...Array(250).keys()].map((id) => {
    // JS doesn't have range by default, so...
    return {
      id,
      type: chance.animal(),
      age: chance.age(),
      name: chance.name(),
    };
  });
  const q = req.query.q?.toLowerCase().trim() || "";
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );
  res.send(results);
};

// Query example... http://localhost:8080/animals/?q=horse
