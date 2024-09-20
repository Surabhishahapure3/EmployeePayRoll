
const nameRef = document.getElementById("emp-name");
const profileRef = document.getElementsByName("profile");
const genderRef = document.getElementsByName("gender");
const nameErrorRef = document.getElementById("nameError");
const profileErrorRef = document.getElementById("profileError");
const genderErrorRef = document.getElementById("genderError");
const deptErrorRef = document.getElementById("deptError");
const salaryRef = document.getElementById("salary");
const salaryErrorRef = document.getElementById("salaryError");
const startErrorRef = document.getElementById("startError");
const noteErrorRef = document.getElementById("notes");
const deptRef = document.querySelectorAll('input[name="hr"], input[name="sales"], input[name="finance"], input[name="engineer"], input[name="others"]');


function validate(name, profile, gender, deptCount, salary, startDate, note) {
    nameErrorRef.textContent = "";
    profileErrorRef.textContent = "";
    genderErrorRef.textContent = "";
    deptErrorRef.textContent = "";
    salaryErrorRef.textContent = "";
    startErrorRef.textContent = "";
    noteErrorRef.textContent = "";

    if (!name) {
        nameErrorRef.style.display = "block";
        nameErrorRef.textContent = "Name is required";
        return false;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!name.match(namePattern)) {
        nameErrorRef.style.display = "block";
        nameErrorRef.textContent = "Name should only contain letters.";
        return false;
    }

    if (name.length < 3 || name.length > 50) {
        nameErrorRef.style.display = "block";
        nameErrorRef.textContent = "Name should be between 3 and 50 characters.";
        return false;
    }

    if (!profile) {
        profileErrorRef.style.display = "block";
        profileErrorRef.textContent = "Profile is required";
        return false;
    }

    if (!gender) {
        genderErrorRef.style.display = "block";
        genderErrorRef.textContent = "Gender is required";
        return false;
    }

    if (deptCount === 0) {
        deptErrorRef.style.display = "block";
        deptErrorRef.textContent = "Department is required";
        return false;
    }

    if (!salary || salary === "") {
        salaryErrorRef.style.display = "block";
        salaryErrorRef.textContent = "Salary is required";
        return false;
    }

    if (!startDate.day || !startDate.month || !startDate.year) {
        startErrorRef.style.display = "block";
        startErrorRef.textContent = "Starting date is required";
        return false;
    }

    if (!note || note.trim() === "") {
        noteErrorRef.style.display = "block";
        noteErrorRef.textContent = "Note is required";
        return false;
    }

    return true;
}

// Handle form submission
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {
    const nameVal = nameRef.value.trim();

    let selectedProfile = "";
    for (let element of profileRef) {
        if (element.checked) {
            selectedProfile = element.value;
        }
    }

    let selectedGender = "";
    for (let element of genderRef) {
        if (element.checked) {
            selectedGender = element.value;
        }
    }

    let selectedDept = [];
    for (let element of deptRef) {
        if (element.checked) {
            selectedDept.push(element.value);
        }
    }

    const deptCount = selectedDept.length;
    const salaryVal = salaryRef.value;

    const startDayRef = document.getElementById("day");
    const startMonthRef = document.getElementById("month");
    const startYearRef = document.getElementById("year");
    const startDate = {
        day: startDayRef.value,
        month: startMonthRef.value,
        year: startYearRef.value
    };

    const note = document.getElementById("notes").value.trim();

    if (!validate(nameVal, selectedProfile, selectedGender, deptCount, salaryVal, startDate, note)) {
        return;
    }

    console.log(selectedGender);
    const empDataObj = {
        name: nameVal, 
        profile: selectedProfile,
        gender: selectedGender,
        department: selectedDept,
        salary: salaryVal, 
        StartDate: startDate,
        Notes: note
    };

    const empRecordList = JSON.parse(localStorage.getItem("empDataList")) || [];
    localStorage.setItem("empDataList", JSON.stringify([...empRecordList, empDataObj]));

    resetForm();
});

// Function to reset the form fields
function resetForm() {
    if (nameRef) {
        nameRef.value = "";
    }

    if (profileRef) {
        profileRef.forEach(element => element.checked = false);
    }

    if (genderRef) {
        genderRef.forEach(element => element.checked = false);
    }

    if (deptRef) {
        deptRef.forEach(element => element.checked = false);
    }

    if (salaryRef) {
        salaryRef.value = '';
    } 

    const startDayRef = document.getElementById("day");
    const startMonthRef = document.getElementById("month");
    const startYearRef = document.getElementById("year");
    if (startDayRef) {
        startDayRef.value = '';
    }
    if (startMonthRef) {
        startMonthRef.value = '';
    }
    if (startYearRef) {
        startYearRef.value = '';
    }

    const note = document.getElementById("notes");
    if (note) {
        note.value = '';
    }   
}

// Handle form reset
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    resetForm();
});

// Handle form cancellation
function cancelForm() {
    resetForm();
}
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", () => {
    cancelForm();
});
