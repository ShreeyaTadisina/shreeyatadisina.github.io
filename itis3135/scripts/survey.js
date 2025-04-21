
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('introForm');
    const coursesContainer = document.getElementById('coursesContainer');
    const addCourseBtn = document.getElementById('addCourse');
    const formOutput = document.getElementById('formOutput');
    const resetFormLink = document.getElementById('resetForm');

    // Add course functionality
    addCourseBtn.addEventListener('click', function () {
        addCourseField();
    });

    // Initial check for delete buttons
    updateDeleteButtons();

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate form
        if (validateForm()) {
            // Process form data
            displayFormData();
            form.style.display = 'none';
            formOutput.style.display = 'block';
        }
    });

    // Reset form link
    resetFormLink.addEventListener('click', function (e) {
        e.preventDefault();
        resetForm();
    });

    // Form reset
    form.addEventListener('reset', function () {
        resetForm();
    });

    function addCourseField() {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'courseEntry';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'course[]';
        input.placeholder = 'Course name';
        input.required = true;

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'deleteCourse';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            coursesContainer.removeChild(courseDiv);
            updateDeleteButtons();
        });

        courseDiv.appendChild(input);
        courseDiv.appendChild(deleteBtn);
        coursesContainer.appendChild(courseDiv);

        updateDeleteButtons();
    }

    function updateDeleteButtons() {
        const courseEntries = document.querySelectorAll('.courseEntry');
        const deleteButtons = document.querySelectorAll('.deleteCourse');

        // Show delete buttons if there's more than one course
        if (courseEntries.length > 1) {
            deleteButtons.forEach(btn => btn.style.display = 'inline-block');
        } else {
            deleteButtons.forEach(btn => btn.style.display = 'none');
        }
    }

    function validateForm() {
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.border = '1px solid red';
            } else {
                field.style.border = '';
            }
        });

        // Check file type if image is uploaded
        const imageInput = document.getElementById('image');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a JPG or PNG image file.');
                isValid = false;
            }
        }

        // Check agreement checkbox
        if (!document.getElementById('agreeCheck').checked) {
            alert('You must agree to the terms before submitting.');
            isValid = false;
        }

        return isValid;
    }

    function displayFormData() {
        const formData = new FormData(form);
        let outputHTML = '<h2>Your Introduction Page</h2>';

        // Process all form data
        for (let [name, value] of formData.entries()) {
            if (name === 'course[]') {
                // Handle courses specially
                if (!outputHTML.includes('<h3>Courses:</h3>')) {
                    outputHTML += '<h3>Courses:</h3><ul>';
                }
                outputHTML += `<li>${value}</li>`;
            } else if (name !== 'image' && name !== 'agreeCheck') {
                // Skip image and checkbox for this display
                const fieldLabel = name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                outputHTML += `<p><strong>${fieldLabel}:</strong> ${value}</p>`;
            }
        }

        // Close courses list if it was opened
        if (outputHTML.includes('<h3>Courses:</h3>')) {
            outputHTML += '</ul>';
        }

        outputHTML += '<p><a href="#" id="resetForm">Reset Form</a></p>';
        formOutput.innerHTML = outputHTML;

        // Reattach reset form event listener
        document.getElementById('resetForm').addEventListener('click', function (e) {
            e.preventDefault();
            resetForm();
        });
    }

    function resetForm() {
        form.style.display = 'block';
        formOutput.style.display = 'none';
        form.reset();

        // Reset courses to just one default
        coursesContainer.innerHTML = `
                        <div class="courseEntry">
                            <input type="text" name="course[]" placeholder="Course name" required value="Web Development">
                            <button type="button" class="deleteCourse" style="display: none;">Delete</button>
                        </div>
                    `;

        // Reattach event listeners
        document.querySelectorAll('.deleteCourse').forEach(btn => {
            btn.addEventListener('click', function () {
                coursesContainer.removeChild(btn.parentNode);
                updateDeleteButtons();
            });
        });
    }
});
