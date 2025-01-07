
// Zola Paper Mod javascript search code by Stephen Hoover
// Used:
// - https://github.com/getzola/zola/blob/master/docs/static/search.js
// - https://github.com/reorx/hugo-PaperModX/blob/master/assets/js/fastsearch.js

// Debounce function definition
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
}

function formatSearchResultItem(item, terms) {
  // Adjust this to match your desired result item structure
  return `<li class="post-entry">
            <header class="entry-header">${item.doc.title}&nbsp;»</header>` +
            `<a href="${item.ref}" aria-label="${item.doc.title}"></a>
          </li>`;
}

function initSearch() {
  var $searchInput = document.getElementById("searchInput"); // Make sure ID matches HTML
  var $searchResults = document.getElementById("searchResults"); // Ensure this matches your HTML
  var MAX_ITEMS = 10;

  var options = {
    bool: "AND",
    fields: {
      title: {boost: 2},
      body: {boost: 1},
    }
  };
  var currentTerm = "";
  var index;
  
  var initIndex = async function () {
    if (index === undefined) {
      index = fetch("/search_index.en.json") // Make sure the path to your search index is correct
        .then(
          async function(response) {
            return await elasticlunr.Index.load(await response.json());
        }
      );
    }
    let res = await index;
    return res;
  }

  $searchInput.addEventListener("keyup", debounce(async function() {
    var term = $searchInput.value.trim();
    if (term === currentTerm) {
      return;
    }
    $searchResults.style.display = term === "" ? "none" : "block";
    $searchResults.innerHTML = ""; // Clear previous results
    currentTerm = term;
    if (term === "") {
      return;
    }

    var results = (await initIndex()).search(term, options);
    if (results.length === 0) {
      $searchResults.style.display = "none";
      return;
    }

    // Directly inserting formatted search result items without additional <li> creation
    for (var i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
      $searchResults.innerHTML += formatSearchResultItem(results[i], term.split(" "));
    }
}, 150));
  window.addEventListener('click', function(e) {
    if ($searchResults.style.display == "block" && !$searchResults.contains(e.target)) {
      $searchResults.style.display = "none";
    }
  });
}


if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}