async function getData() {
  const movieName = document.querySelector(".input").value;
  const movieResponse = await fetch(
    `http://www.omdbapi.com/?apikey=abc2446&t=${movieName}`
  );
  const data = await movieResponse.json();
  const yearAgo = 2022 - data.Year;
  const actors = data.Actors.split(" ");
  const names = [];
  for (let i = 0; i < actors.length; i += 2) {
    names.push(actors[i]);
  }
  const countries = data.Country;
  const commaIndex = countries.indexOf(",");

  let country;
  //ეს კოდის ნაწილი აბრუნებს პირველ ქვეყანას ქვეყნების სტრინგში.
  if (commaIndex !== -1) {
    country = countries.substring(0, commaIndex);
  } else {
    country = countries;
  }

  const countryResponse = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const countryDataArr = await countryResponse.json();
  const countryData = await countryDataArr[0];
  const tld = countryData.tld[0].slice(1);
  const flagResponse = await fetch(
    `https://flagpedia.net/data/flags/icon/36x27/${tld}.png`
  );
  const flagUrl = flagResponse.url;

  document.querySelector(".output").innerHTML = `
  This movie was released ${yearAgo} years ago.
  Actor names: ${names.join(", ")}
  `;
  document.querySelector(
    ".countryDescr"
  ).innerHTML = `this movie was made in: ${country}`;
  document.querySelector(".img").src = flagUrl;
}
