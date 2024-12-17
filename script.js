document.addEventListener("DOMContentLoaded", () => {
    const API_BASE = "https://api.spacexdata.com/v4";
  
    // Fetch latest launch
    fetch(`${API_BASE}/launches/latest`)
      .then((response) => response.json())
      .then((launch) => {
        const launchDataDiv = document.getElementById("launch-data");
        launchDataDiv.innerHTML = `
          <h3>${launch.name}</h3>
          <p><strong>Date:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
          <p><strong>Details:</strong> ${launch.details || "No details available."}</p>
          <a href="${launch.links.webcast}" target="_blank" style="color: #ff6600;">Watch Webcast</a>
        `;
      })
      .catch((error) => {
        console.error("Error fetching latest launch:", error);
        document.getElementById("launch-data").innerHTML = "<p>Error loading data.</p>";
      });
  
    // Fetch news
    fetch("https://api.spacexdata.com/v4/company")
      .then((response) => response.json())
      .then((data) => {
        const newsList = document.getElementById("news-list");
        newsList.innerHTML = `
          <li><strong>CEO:</strong> ${data.ceo}</li>
          <li><strong>Founded:</strong> ${data.founded}</li>
          <li><strong>Headquarters:</strong> ${data.headquarters.city}, ${data.headquarters.state}</li>
          <li><a href="${data.links.website}" target="_blank" style="color: #ff6600;">Visit Official Website</a></li>
        `;
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        document.getElementById("news-list").innerHTML = "<li>Error loading data.</li>";
      });
  });
  