import { data } from "/data.js";

const loadEvent = function () {
  const page = window.location.pathname.substring(1);
  // Write your JavaScript code after this line

  console.log("data: ", data);
  console.log("page: ", page);

  const rootElement = document.getElementById("root");

  const element = function (tag, inner, index) {
    return `<${tag} class = ${index}>${inner}</${tag}>`;
  };

  let getData = (arr, id) => {
    for (let name of arr) {
      if (name.id === id) {
        return name.name;
      }
    }
  };

  const addMoviesData = function () {
    let index = 1;

    data.movies.forEach((item) => {
      rootElement.insertAdjacentHTML(
        "beforeend",
        element("h1", `${"Title: "} ${item.title}`, "movie")
      );
      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Year: "} ${item.year}`, "year")
        );
      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Runtime: "} ${item.runtime}`, "runtime")
        );
      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Genres: "} ${item.genres}`, "genres")
        );
      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element(
            "div",
            `${"Release date: "} ${item["release-date"]}`,
            "release-date"
          )
        );
      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Storyline: "} ${item.storyline}`, "storyline")
        );

      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Writers: "}`, "writers-title")
        );

      // Add writers
      for (let i = 0; i < item.writers.length; i++) {
        document
          .querySelector(`.movie:nth-child(${index})`)
          .insertAdjacentHTML(
            "beforeend",
            element(
              "div",
              getData(data.professionals, item.writers[i]),
              "writers"
            )
          );
      }

      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Actors: "}`, "actors-title")
        );

      // Add actors
      for (let i = 0; i < item.actors.length; i++) {
        document
          .querySelector(`.movie:nth-child(${index})`)
          .insertAdjacentHTML(
            "beforeend",
            element(
              "div",
              getData(data.professionals, item.actors[i]),
              "actors"
            )
          );
      }

      document
        .querySelector(`.movie:nth-child(${index})`)
        .insertAdjacentHTML(
          "beforeend",
          element("div", `${"Directors: "}`, "directors-title")
        );

      // Add directors
      for (let i = 0; i < item.directors.length; i++) {
        document
          .querySelector(`.movie:nth-child(${index})`)
          .insertAdjacentHTML(
            "beforeend",
            element(
              "div",
              getData(data.professionals, item.directors[i]),
              "directors"
            )
          );
      }
      index++;
    });
  };

  const listProfessionals = (movieDB, role) => {
    rootElement.insertAdjacentHTML(
      `beforeend`,
      `<section id = ${role}s></section>`
    );

    movieDB.professionals.forEach((element) => {
      if (element.roles.includes(role)) {
        document
          .querySelector(`#${role}s`)
          .insertAdjacentHTML(
            `beforeend`,
            `<h1 class = ${role}>${element.name}</h1>`
          );
      }

      movieDB.movies.forEach((movie) => {
        if (movie[`${role}s`].includes(element.id)) {
          document
            .querySelector(`#${role}s`)
            .insertAdjacentHTML(
              `beforeend`,
              `<h4 class = movie>${movie.title}</h4>`
            );
        }
      });
    });
  };

  const listMoviesByGenres = () => {
    let index = 1;
    for (const genre in data.genres[0]) {
      document
        .querySelector(`#root`)
        .insertAdjacentHTML(
          `beforeend`,
          `<h1 class = ${"genres-list"}>${genre}</h1>`
        );
      for (let i = 0; i < data.genres[0][genre].length; i++) {
        const movie = data.movies.filter(function (movieObj) {
          return movieObj.title === data.genres[0][genre][i].name;
        })[0];
        const parent = document.querySelector(`#root > h1:nth-child(${index})`);
        parent.insertAdjacentHTML("beforeend", "<br><br>");
        for (const key in movie) {
          parent.insertAdjacentHTML(
            `beforeend`,
            `<div class=movie>${key}: ${movie[key]}</div>`
          );
        }
      }
      ++index;
    }
  };

  switch (page) {
    case `actors`:
      listProfessionals(data, `actor`);
      break;

    case `directors`:
      listProfessionals(data, `director`);
      break;

    case `writers`:
      listProfessionals(data, `writer`);
      break;

    case `movies`:
      addMoviesData();
      break;

    case `genres`:
      listMoviesByGenres();
      break;

    default:
      break;
  }

  // Write your JavaScript code before this line
};

window.addEventListener("load", loadEvent);
