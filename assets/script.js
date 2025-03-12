function countTextMetrics() {
  let text = document.getElementById("textInput").value.toLowerCase();

  // Split the text into words and clean up any punctuation
  let words = text
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z\s]/g, "")) // Remove punctuation
    .filter((word) => word.length > 0); // Remove empty words

  let characters = text.length;
  let sentences = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0); // Split sentences
  let paragraphs = text
    .split(/\n+/)
    .filter((paragraph) => paragraph.trim().length > 0); // Split paragraphs

  // Focus Keywords input
  let focusKeywordsInput = document
    .getElementById("focusKeyword")
    .value.toLowerCase();

  // Treat keywords separated by commas as separate keywords and multi-word ones as single
  let focusKeywords = focusKeywordsInput
    .split(",") // Split by comma
    .map((keyword) => keyword.trim()) // Trim extra spaces
    .filter((keyword) => keyword.length > 0); // Filter out empty keywords

  let wordFrequency = {};

  // Count word frequencies, including multi-word keywords as one
  words.forEach((word) => {
    if (word) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });

  // Display the results
  document.getElementById("wordCount").innerText = words.length;
  document.getElementById("charCount").innerText = characters;
  document.getElementById("sentenceCount").innerText = sentences.length;
  document.getElementById("paragraphCount").innerText = paragraphs.length;

  let keywordList = document.getElementById("keywordDensity");
  keywordList.innerHTML = "";

  // Display keyword density for each focus keyword
  focusKeywords.forEach((keyword) => {
    // Count how many times each focus keyword appears
    let keywordCount = 0;
    if (keyword.includes(" ")) {
      // For multi-word keywords (like "artificial intelligence")
      let regex = new RegExp(`\\b${keyword}\\b`, "g"); // Create a regex for the whole phrase
      keywordCount = (text.match(regex) || []).length;
    } else {
      // For single-word keywords
      keywordCount = words.filter((word) => word === keyword).length;
    }

    let li = document.createElement("li");
    li.innerText = `${keyword}: ${keywordCount} times`;
    keywordList.appendChild(li);
  });
}

document
  .getElementById("textInput")
  .addEventListener("input", countTextMetrics);

document
  .getElementById("focusKeyword")
  .addEventListener("input", countTextMetrics);

document.getElementById("clearButton").addEventListener("click", function () {
  document.getElementById("textInput").value = "";
  document.getElementById("focusKeyword").value = "";
  countTextMetrics();
});
