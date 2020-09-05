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
    const fullName = element.fullname;
    const nameLowerCase = fullName.trim().toLowerCase();
    let capital = nameLowerCase.substring(0, 1).toUpperCase();
    let name = nameLowerCase.substring(1, nameLowerCase.indexOf(" "));
    const firstName = `${capital}${name}`;
    console.log(firstName);
    console.log(nameLowerCase);

    studens.firstName = firstName;
    studensList.push(studens);
  });

  console.table(studensList);
  orderTheList();
}

function orderTheList() {}
