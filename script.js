const assignments = [];

const form = document.getElementById('assignmentForm');
const nameInput = document.getElementById('nameInput');
const gradeInput = document.getElementById('gradeInput');
const assignmentList = document.getElementById('assignmentList');
const gpaDisplay = document.getElementById('gpaDisplay');

// Load data from localStorage on page load
window.onload = () => {
  const stored = JSON.parse(localStorage.getItem('assignments')) || [];
  stored.forEach(a => assignments.push(a));
  renderAssignments();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  if (name && !isNaN(grade) && grade >= 0 && grade <= 5) {
    assignments.push({ name, grade });
    saveToLocalStorage();
    renderAssignments();
    form.reset();
  } else {
    alert('Please enter a valid name and grade (0 - 5)');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 's') {
    console.log('All Assignments:', assignments);
  }
});

function calculateGPA() {
  if (assignments.length === 0) return 0;
  const total = assignments.reduce((sum, a) => sum + a.grade, 0);
  return (total / assignments.length).toFixed(2);
}

function renderAssignments() {
  assignmentList.innerHTML = '';
  assignments.forEach((a, i) => {
    const li = document.createElement('li');
    li.textContent = `${a.name}: ${a.grade}`;
    assignmentList.appendChild(li);
  });

  gpaDisplay.textContent = `GPA: ${calculateGPA()}`;
}

function saveToLocalStorage() {
  localStorage.setItem('assignments', JSON.stringify(assignments));
}
