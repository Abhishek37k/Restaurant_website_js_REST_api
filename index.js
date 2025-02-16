const crudKey =
  "https://crudcrud.com/api/fdf4bc6fa006400aadf6b1907a4563b8/itemData";

const myForm = document.getElementById("my-form");
const msg = document.getElementById("msg");
const itemPrice = document.getElementById("price");
const itemName = document.getElementById("name");
const itemCategory = document.getElementById("category");
const btn = document.getElementById("btn");

function addNewItem(itemData) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center pt-2";
  const textSpan = document.createElement("span");
  textSpan.textContent = `${itemData.name} - ${itemData.price} - ${itemData.category}`;
  li.appendChild(textSpan);

  const deleteBtn = document.createElement("button");

  deleteBtn.className = "btn btn-sm btn-danger mx-1";
  deleteBtn.appendChild(document.createTextNode("Delete this order"));
  li.appendChild(deleteBtn);

  if (itemData.category === "table1") {
    document.querySelector("#table1").appendChild(li);
  }
  if (itemData.category === "table2") {
    document.querySelector("#table2").appendChild(li);
  }
  if (itemData.category === "table3") {
    document.querySelector("#table3").appendChild(li);
  }

  deleteBtn.addEventListener("click", (e) => {
    var itemCrudAPI = crudKey + `/${itemData._id}`;

    // delete item
    axios
      .delete(itemCrudAPI)
      .then()
      .catch((error) => {
        console.log(error);
      });

    li.remove();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  axios.get(crudKey).then((res) => {
    for (var i = 0; i < res.data.length; i++) {
      addNewItem(res.data[i]);
    }
  });
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    itemName.value == "" ||
    itemPrice.value == "" ||
    itemCategory.value == ""
  ) {
    msg.innerHTML = "Please enter all fields.";
  } else {
    itemData = {
      price: itemPrice.value,
      name: itemName.value,
      category: itemCategory.value,
    };

    axios
      .post(crudKey, itemData)
      .then((res) => {
        console.log(res.data);
        addNewItem(res.data);
        itemPrice.value = "";
        itemName.value = "";
        itemCategory.value = "";
        msg.innerHTML = "";
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  }
});
