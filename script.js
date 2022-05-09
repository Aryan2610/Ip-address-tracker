"use strict";
const api_key = "at_ZohgIVMWnVxiSZ14v6J5MPZGMoBoc"; //Generate your own key
const api_uri = "https://geo.ipify.org/api/";
const current_version = "v1";
const current_ip = document.querySelector(".current_ip");
const current_town = document.querySelector(".current_town");
const current_zone = document.querySelector(".current_zone");
const current_isp = document.querySelector(".current_isp");
const entered_ip = document.querySelector(".ip_address");
const search_btn = document.querySelector(".search_btn");

const map = L.map("display-map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

const updateMarker = (update_marker = []) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

const getIPDetails = async function (ip) {
  const res = await fetch(
    `${api_uri}${current_version}?apiKey=${api_key}&ipAddress=${ip}`
  );
  const data = await res.json();
  //   console.log(data);
  current_ip.innerHTML = data.ip;
  current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
  current_zone.innerHTML = data.location.timezone;
  current_isp.innerHTML = data.isp;

  updateMarker([data.location.lat, data.location.lng]);
};

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (entered_ip.value != "" && entered_ip.value != null) {
    getIPDetails(entered_ip.value);
    return;
  }
  alert("Please enter a valid IP address");
});
