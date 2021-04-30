r = document.getElementById("result");
ac = document.getElementById("ac");
ty = document.getElementById("ty");
pa = document.getElementById("pa");
pr = document.getElementById("pr");
lk = document.getElementById("lk");
bt1 = document.getElementById("bt1");
bt2 = document.getElementById("bt2");
bt3 = document.getElementById("bt3");
cb = document.getElementById("combo");
cb2 = document.getElementById("combo2");

/*GET random activity */
bt1.addEventListener("click", async () => {
  r.style.display = "block";
  const url = "http://localhost:3000/ser/";
  await fetch(url, { headers: { Accept: "application/json" } })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      ac.innerText = `Activity → ${data.activity}`;
      ty.innerText = `Type → ${data.type}`;
      pa.innerText = `Participants → ${data.participants}`;
      pr.innerText = `Price → ${data.price * 10} EUR`;
    });
});

/* GET VALUE OF COMBOX OF TYPE*/
function GetCombox() {
  let valore = cb.options[cb.selectedIndex].value;
  return valore;
}
/* GET VALUE OF COMBOX OF PARTICIPANTS*/
function GetCombox2() {
  let valore = cb2.options[cb2.selectedIndex].value;
  return valore;
}

/*POST combox */
bt2.addEventListener("click", async () => {
  r.style.display = "block";
  let data = GetCombox();
  let data3 = GetCombox2();
  let data2 = { data, data3 };
  const url = "http://localhost:3000/req/";
  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data2),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      err = Object.values(data).toString();
      if (err === "No activity found with the specified parameters") {
        alert("No activity found, try again with other parameters");
        r.style.display = "none";
        window.location.reload();
      }
      ac.innerText = `Activity --> ${data.activity}`;
      ty.innerText = `Type --> ${data.type}`;
      pa.innerText = `Participants --> ${data.participants}`;
      pr.innerText = `Price --> ${data.price * 10} EUR`;
    });
});

/* CLEAR BUTTON*/
bt3.addEventListener("click", function () {
  ac.innerText = "";
  ty.innerText = "";
  pa.innerText = "";
  pr.innerText = "";
  r.style.display = "none";
});

/* RESULT DIV */
function hide() {
  if (r.style.display === "none") {
    r.style.display = "block";
  } else {
    r.style.display = "none";
  }
}

window.onload = hide;
