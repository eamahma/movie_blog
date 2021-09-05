/*
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
*/

async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.log("logout error 1");
    alert(response.statusText);
  }
}

document.querySelector("#logout-btn").addEventListener("click", logout);