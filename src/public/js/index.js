console.log("indexJs")

const button = document.getElementById("next")


//AGREGAR PRODUCTO
const productForm = document.getElementById("form");
productForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const body = {};
  const inputsForms = Array.from(productForm.elements);
  let emptyValue;
  inputsForms.forEach(({ name: field, value }, index) => {
    if (index !== inputsForms.length - 1) {
        if(!value) emptyValue = true
        body[field] = value;
    }        
  });
  if(emptyValue){
    window.alert("Ingrese todos los campos")
    return
  }
  const data = await fetch("http://localhost:8080/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { redirectUrl, message } = await data.json();
  if (data.status === 200) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = `${redirectUrl}/${message}`;
  }
});
