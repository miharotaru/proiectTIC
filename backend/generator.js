const { faker } = require("@faker-js/faker");

const generateLibraries = () => {
  let libraryList = [];
  for (let i = 0; i < 7; i++) {
    let initialName = faker.lorem.word({ length: { min: 7, max: 12 } });
    let finalName = initialName[0].toUpperCase() + initialName.substring(1);
    let library = {
      name: finalName,
      city: faker.location.city(),
      county: faker.location.county(),
    };
    libraryList.push(library);
  }
  return libraryList;
};

const generateBooks = () => {
  const bookCategories = ["Realitate", "Fantasy", "Istorie","IT"];
  bookList = [];
  for (let i = 0; i < 7; i++) {
    let initialTitle = faker.lorem.word({ length: { min: 4, max: 15 } });
    let finalTitle = initialTitle[0].toUpperCase() + initialTitle.substring(1);
    bookList.push({
      title: finalTitle,
      category: bookCategories[Math.floor(Math.random() * bookCategories.length)],
      author: faker.person.fullName(),
      year: Math.floor(Math.random() * (new Date().getFullYear() - 1800 + 1)) +
      1800,
    });
  }
  return bookList;
};
module.exports = { generateBooks, generateLibraries };