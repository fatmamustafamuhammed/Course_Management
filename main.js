// DOM Elements
let title = document.getElementById('title');
let image = document.getElementById('image');
let category = document.getElementById('category');
let instructor = document.getElementById('instructor');
let description = document.getElementById('description');
let price = document.getElementById('price');
let duration = document.getElementById('duration');
let video = document.getElementById('video');
let pdf = document.getElementById('pdf');
let submit = document.getElementById('submit');
let searchInput = document.getElementById('search');

let courses = localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : [];
let mode = 'create';
let tmpIndex;

// Create or Update Course
submit.onclick = function () {
    let newCourse = {
        id: mode === 'create' ? courses.length + 1 : courses[tmpIndex].id,
        title: title.value.toLowerCase(),
        image: image.value,
        category: category.value.toLowerCase(),
        instructor: instructor.value,
        description: description.value,
        price: price.value,
        duration: duration.value,
        video: video.value,
        pdf: pdf.value
    };

    if (title.value !== '' && instructor.value !== '' && category.value !== '') {
        if (mode === 'create') {
            courses.push(newCourse);
        } else {
            courses[tmpIndex] = newCourse;
            mode = 'create';
            submit.innerText = 'Create';
        }

        localStorage.setItem('courses', JSON.stringify(courses));
        clearFields();
        displayCourses();
    }
};

// Clear Input Fields
function clearFields() {
    title.value = '';
    image.value = '';
    category.value = '';
    instructor.value = '';
    description.value = '';
    price.value = '';
    duration.value = '';
    video.value = '';
    pdf.value = '';
}

function displayCourses(filteredCourses = courses) {
    let table = '';
    for (let i = 0; i < filteredCourses.length; i++) {
        table += `
            <tr>
                <td>${filteredCourses[i].id}</td>
                <td>${filteredCourses[i].title}</td>
                <td><img src="${filteredCourses[i].image}" alt="Course Image" width="50"></td>
                <td>${filteredCourses[i].category}</td>
                <td>${filteredCourses[i].instructor}</td>
                <td>${filteredCourses[i].description}</td>
                <td>${filteredCourses[i].price}</td>
                <td>${filteredCourses[i].duration}</td>
                <td><a href="${filteredCourses[i].video}" target="_blank">Watch Video</a></td>
                <td><a href="${filteredCourses[i].pdf}" target="_blank">PDF</a></td>
                <td><button onclick="editCourse(${i})">Edit</button></td>
                <td><button onclick="deleteCourse(${i})">Delete</button></td>
            </tr>
        `;
    }
    
    document.getElementById('tbody').innerHTML = table;

    // Show/Hide Delete All button
    let deleteAllBtn = document.getElementById('deleteAll');
    if (courses.length > 0) {
        deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All</button>`;
    } else {
        deleteAllBtn.innerHTML = '';
    }
}
// Edit Course
function editCourse(index) {
    title.value = courses[index].title;
    image.value = courses[index].image;
    category.value = courses[index].category;
    instructor.value = courses[index].instructor;
    description.value = courses[index].description;
    price.value = courses[index].price;
    duration.value = courses[index].duration;
    video.value = courses[index].video;
    pdf.value = courses[index].pdf;
    
    mode = 'update';
    tmpIndex = index;
    submit.innerText = 'Update';
}

// Delete Course
function deleteCourse(index) {
    courses.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(courses));
    displayCourses();
}

// Delete all courses
function deleteAll() {
    localStorage.removeItem('courses'); // Remove stored courses
    courses = []; // Clear the in-memory array
    displayCourses(); // Refresh UI
}

// Search Feature
let searchMode = 'title';

function getSearchMode(id) {
    searchMode = id === 'searchTitle' ? 'title' : 'category';
    searchInput.placeholder = `Search by ${searchMode}`;
    searchInput.focus();
    searchInput.value = '';
    displayCourses();
}

function searchData(value) {
    let filteredCourses = courses.filter(course =>
        course[searchMode].toLowerCase().includes(value.toLowerCase())
    );
    displayCourses(filteredCourses);
}

// Load Courses on Page Load
displayCourses();