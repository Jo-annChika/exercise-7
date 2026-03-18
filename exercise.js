const output = document.getElementById("output")

function log(text){
  output.textContent += text + "\n"
}

function clearOutput(){
  output.textContent = ""
}

// OPTIONAL (Part E): only works if you add <ul id="userList"></ul> to HTML
const list = document.getElementById("userList") // will be null if you didn't add it

document.getElementById("btnLoadUsers").onclick = loadUsers

async function loadUsers(){
  clearOutput()
  if (list) list.innerHTML = ""

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    // HTTP status check
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status)
    }

    const users = await response.json()

    // Checkpoint (Part A)
    console.log(users) // prints an array of user objects

    users.forEach(function(user){
      const name = user.name
      const email = user.email
      const city = user.address.city // nested field

      const line = name + " - " + email + " - " + city
      log(line)

      // OPTIONAL (Part E)
      if (list) {
        const li = document.createElement("li")
        li.textContent = line
        list.appendChild(li)
      }
    })

  } catch (error) {
    log("Error: " + error.message)
  }
}