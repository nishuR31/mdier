const textarea = document.getElementById("markdown");
const preview = document.getElementById("preview");
const landing = document.getElementById("landing");
const editor = document.getElementById("editor");
const input = document.getElementById("file");
const btn = document.getElementById("start");
const themeBtn = document.getElementById("theme");

// Show editor and hide landing
async function startEditor(text = "") {
  landing.classList.add("hidden");
    landing.classList.remove("block");
  editor.classList.remove("hidden");
    editor.classList.add("block");

  if (text) {
    textarea.value = text;
  }
  updatePreview();
}

btn.addEventListener("click", () => startEditor());

// Handle file upload
async function file(event) {
  const text = await event.target.files[0].text();
  if (text) {
    await startEditor(text);
  }
}
input.addEventListener("change", file);

// Live preview update
function updatePreview(rawMarkdown = textarea.value) {
  const html = marked.parse(rawMarkdown || "");
  preview.srcdoc = `
    <html>
    <head>
<style>
          body {
            font-family: Arial, sans-serif;
            padding: 5px;
            color: white;
            background: transparent;
          }
          pre {

            color:black;
            background: #ffffff50;
            padding: 10px;

            border-radius: 5px;
            width:fit-content;


          }
          code {            

            font-family: monospace;
            color:black
          }
          blockquote {
            background-color: #e0f7fa50;  /* Light cyan background */
            border-left: 5px solid #00acc1; /* Accent bar */
            padding: 10px 15px;
            margin: 10px 0;
            border-radius: 5px;
            color:black
          }
        </style></head>
        <body>
     ${html}</body>
    </html>`;
}

// Update preview while typing
textarea.addEventListener("input", () => updatePreview());

// Toggle dark/light theme
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark", false);
});

// Initial preview
updatePreview();
