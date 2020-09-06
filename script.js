"use strict";
window.addEventListener("load", start);
const studensList = [];

const Students = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  photoName: "",
  house: "",
};

function start() {
  getJsonData();
}

async function getJsonData() {
  const URL = "https://petlatkea.dk/2020/hogwarts/students.json";
  const jsonData = await fetch(URL);
  const studensArray = await jsonData.json();
  getStudentsObject(studensArray);
  console.log(studensArray);
}

function getStudentsObject(studensArray) {
  studensArray.forEach((element) => {
    const studens = Object.create(Students);
    const fullName = element.fullname.toLowerCase().trim();
    // console.log("fullName is:", fullName);

    let splitName = fullName.split(" ");
    if (splitName.length === 2) {
      let name2 = splitName[1];
      let lastName =
        name2[0].toUpperCase() + fullName.substring(fullName.indexOf(" ") + 2);
      studens.lastName = lastName;
    } else {
      let name = fullName.substring(fullName.lastIndexOf(" "));
      let lastName =
        name[1].toUpperCase() +
        fullName.substring(fullName.lastIndexOf(" ") + 2);
      studens.lastName = lastName.trim();
    }

    for (let i = 0; i < fullName.length; i++) {
      let firstName =
        fullName[0].toUpperCase() +
        fullName.substring(1, fullName.indexOf(" "));
      studens.firstName = firstName;
    }
    studensList.push(studens);
  });

  console.table(studensList);
  orderTheList();
}

function orderTheList() {}
