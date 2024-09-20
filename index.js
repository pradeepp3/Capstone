let user_form = document.getElementById("form1");
const retEvents=()=>{
    let entries=localStorage.getItem("user_Entries");
    if(entries){
        entries=JSON.parse(entries);
    } else{
        entries=[];
    }
    return entries;
}

let u_entry = retEvents();

const display=()=>{
    const entries=retEvents();
    const tablent=entries.map((entry) => {
        const namecell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailcell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const dobcell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const passcell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const acceptedTermscell = `<td class="border px-4 py-2"
        
        
        
        >${entry.accept}</td>`;
        return `<tr> ${namecell} ${emailcell} ${passcell} ${dobcell} ${acceptedTermscell} </tr>`;
    }).join("\n");
    
    const table = "<table><tr><th>Name</th><th>Email</th><th>Password</th><th>dob</th><th>accepted terms?</th></tr>"+tablent+"</table>";
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const save = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const accept = document.getElementById("acceptTerms").checked;
  // Calculate age
  const dobDate = new Date(dob);
  const age = new Date().getFullYear() - dobDate.getFullYear();
  const monthDiff = new Date().getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && new Date() < dobDate)) {
    age--;
  }

  // Check if age is between 18 and 55
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old.");
    return;
  }
  const entry = {
    name,
    email,
    password,
    dob,
    accept,
  };
  u_entry.push(entry);

  localStorage.setItem("user_Entries", JSON.stringify(u_entry));
  display();
};
user_form.addEventListener("submit", save);
display();