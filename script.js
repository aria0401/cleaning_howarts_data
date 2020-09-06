"use strict";
window.addEventListener("load", start);
const studensList = [];
const Students = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  image: "",
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
    const students = Object.create(Students);
    const fullName = element.fullname.toLowerCase().trim();
    console.log("fullName is:", fullName);
    //for all the firtsNames
    students.firstName =
      fullName[0].toUpperCase() + fullName.substring(1, fullName.indexOf(" "));

    let splitName = fullName.split(" ");
    //for firtsNames without lastNames
    if (splitName.length === 1) {
      students.firstName = fullName[0].toUpperCase() + fullName.substring(1);
      students.lastName = "---";
    } else if (splitName.length === 2) {
      //for lastNames without middleNames
      let name2 = splitName[1];
      let lastName =
        name2[0].toUpperCase() + fullName.substring(fullName.indexOf(" ") + 2);
      name2[0].toUpperCase() + fullName.substring(fullName.indexOf(" ") + 2);
      students.lastName = lastName;

      if (lastName.includes("-")) {
        //for lastNames with hyphen
        let name = lastName.substring(lastName.indexOf("-") + 1);
        let hypherName =
          name[0].toUpperCase() +
          fullName.substring(fullName.lastIndexOf("-") + 2);
        students.lastName =
          lastName.substring(0, lastName.indexOf("-") + 1) + hypherName;
      }
    } else if (splitName.length === 3) {
      //for middleNames
      let name = fullName.substring(fullName.lastIndexOf(" "));
      let lastName =
        name[1].toUpperCase() +
        fullName.substring(fullName.lastIndexOf(" ") + 2);
      let middleName =
        fullName
          .substring(fullName.indexOf(" ") + 1, fullName.indexOf(" ") + 2)
          .toUpperCase() +
        fullName.substring(
          fullName.indexOf(" ") + 2,
          fullName.lastIndexOf(" ")
        );
      if (fullName.includes('"')) {
        let quotations = fullName.substring(
          fullName.indexOf('"') + 1,
          fullName.lastIndexOf('"')
        );
        students.nickName =
          quotations[0].toUpperCase() + quotations.substring(1);
      }
      students.lastName = lastName;
      students.middleName = middleName;
    }
    //for the house
    const house = element.house.toLowerCase().trim();
    students.house = house[0].toUpperCase() + house.substring(1);
    if (students.lastName != "---") {
      students.image =
        students.lastName.toLowerCase() +
        "_" +
        students.firstName[0].toLowerCase() +
        ".png";
    }

    studensList.push(students);
  });
  console.table(studensList);
}
