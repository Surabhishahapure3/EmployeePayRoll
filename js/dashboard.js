let $tbody = $("#tbody");

$(document).ready(function () {

  loadEmployees();

 
  $("#search-button").click(function () {
    let searchText = $("#search-input").val().trim().toLowerCase();
    searchEmployees(searchText);
  });


  // $("#search-input").keyup(function () {
  //   let searchText = $(this).val().trim().toLowerCase();
  //   searchEmployees(searchText);
  // });
});


function loadEmployees() {
  $.ajax({
    url: "http://localhost:5000/employees",
    method: "GET",
    dataType: "json",
    success: function (json) {
      $tbody.empty(); 
      $.each(json, function (index, data) {
        console.log(data);
        $tbody.append(td_fun(data.name, data.profile, data.gender, data.department, data.salary, data.startdate, data.id));
      });
    },
    error: function (error) {
      console.log("Error fetching employees:", error);
    }
  });
}


function searchEmployees(searchText) {
  $.ajax({
    url: "http://localhost:5000/employees",
    method: "GET",
    dataType: "json",
    success: function (json) {
      $tbody.empty(); 
      let filteredData = json.filter(emp => emp.name.toLowerCase().includes(searchText));
      if (filteredData.length === 0) {
        $tbody.append("<tr><td colspan='7'>No matching employees found</td></tr>");
      } else {
        $.each(filteredData, function (index, data) {
          $tbody.append(td_fun(data.name, data.profile, data.gender, data.department, data.salary, data.startdate, data.id));
        });
      }
    },
    error: function (error) {
      console.log("Error fetching employees:", error);
    }
  });
}


function td_fun(name, image, gender, dept, salary, startdate, id) {
  let $tr = $("<tr></tr>");
  let deptLabels = "";
  
  dept.forEach(function (department) {
    deptLabels += `<span class="dept-label">${department}</span> `;
  });
  
  $tr.attr("id", `row-${id}`); 
  
  $tr.html(`
    <td class="emp-info">
      <img src=${image} alt="Employee" class="emp-img" />
      <span>${name}</span>
    </td>
    <td>${gender}</td>
    <td>
      ${deptLabels}
    </td>
    <td>₹ ${salary}</td>
    <td>${startdate.day} ${startdate.month} ${startdate.year}</td>
    <td class="action-buttons">
      <button class="action-btn" onclick="deleteEmp('${id}')"><img src="../assets/delete.png" alt="Delete"/></button>
      <button class="action-btn" onclick="edit('${id}')"><img src="../assets/pencil.png" alt="Edit"/></button>
    </td>
  `);
  
  return $tr;
}


function deleteEmp(id) {
  $.ajax({
    url: `http://localhost:5000/employees/${id}`,
    type: "DELETE",
    success: function (res) {
      console.log(`Employee ${id} deleted successfully`);
      $(`#row-${id}`).remove();
      alert("Employee data deleted successfully");
    },
    error: function (er) {
      console.error(er);
      alert("Error in deleting the employee data");
    }
  });
}


function edit(id) {
  localStorage.setItem("EmpId", id);
  window.location.href = "../pages/EmpPayrollRegister.html";
}
