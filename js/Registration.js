$(document).ready(function() {
    const empId = localStorage.getItem("EmpId"); // Retrieve the employee ID if editing
  
    // Check if the user is editing an existing employee
    if (empId) {
      // Editing mode: fetch the employee data for the given ID
      $.ajax({
        url: `http://localhost:5000/employees/${empId}`,
        method: "GET",
        dataType: "json",
        success: function(employee) {
          // Pre-fill the form with the employee data
          $("#emp-name").val(employee.name);
          $(`input[name='gender'][value='${employee.gender}']`).prop("checked", true);
          $(`input[name='profile'][value='${employee.profile}']`).prop("checked", true);
          
          // Check the appropriate department checkboxes
          employee.department.forEach(function(dept) {
            $(`input[value='${dept}']`).prop("checked", true);
          });
          
          $("#salary").val(employee.salary);
          $("#day").val(employee.startdate.day);
          $("#month").val(employee.startdate.month);
          $("#year").val(employee.startdate.year);
          $("#notes").val(employee.notes);
        },
        error: function(error) {
          console.error("Error fetching employee data for editing:", error);
        }
      });
    }
  
    // Handle form submission for both adding and updating
    $("#submitButton").on("click", function(event) {
      event.preventDefault();
  
      const nameVal = $("#emp-name").val().trim();
  
      // Get selected profile
      const selectedProfile = $("input[name='profile']:checked").val() || "";
  
      // Get selected gender
      const selectedGender = $("input[name='gender']:checked").val() || "";
  
      // Get checked departments
      let department = [];
      $("input[name='hr'], input[name='sales'], input[name='finance'], input[name='engineer'], input[name='others']").each(function() {
        if($(this).is(":checked")) {
          department.push($(this).val());
        }
      });
  
      const salaryVal = $("#salary").val();
      
      // Date selection
      const startDate = {
        day: $("#day").val(),
        month: $("#month").val(),
        year: $("#year").val()
      };
  
      const note = $("#notes").val().trim();
      
      const empObj = {
        name: nameVal,
        profile: selectedProfile,
        gender: selectedGender,
        department: department,
        salary: salaryVal,
        startdate: startDate,
        notes: note
      };
  
      if (empId) {
        // Update existing employee
        $.ajax({
          url: `http://localhost:5000/employees/${empId}`,
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify(empObj),
          success: function() {
            alert("Employee updated successfully");
            localStorage.removeItem("EmpId");
            window.location.href = "../pages/employeeList.html"; // Redirect back to list
          },
          error: function(error) {
            console.error("Error updating employee:", error);
          }
        });
      } else {
        // Add new employee
        $.ajax({
          url: "http://localhost:5000/employees",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(empObj),
          success: function() {
            alert("Employee added successfully");
            window.location.href = "../pages/employeeList.html"; // Redirect back to list
          },
          error: function(error) {
            console.error("Error adding employee:", error);
          }
        });
      }
    });
  });
  