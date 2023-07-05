var form = document.getElementById("formData");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var courseCode = document.getElementById("course_code").value;
  var teacherName = document.getElementById("teacher_name").value;
  var assignmentName = document.getElementById("assign_name").value;
  var roll = document.getElementById("roll").value;
  var dateOfSubmission = document.getElementById("date_assign").value;

  var formData = new FormData();
  formData.append("courseCode", courseCode);
  formData.append("teacherName", teacherName);
  formData.append("assignmentName", assignmentName);
  formData.append("roll", roll);
  formData.append("dateOfSubmission", dateOfSubmission);

  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://smartcoverbuilder.000webhostapp.com/AssignmentDB.php",
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(formData);
});

async function MakeAssignment() {
  const button = document.querySelector(".assgnr");
  button.innerText = "Generating...";

  const fileUrl = "https://smartcoverbuilder.000webhostapp.com/Assignment.pdf";

  const response = await fetch(fileUrl);
  const pdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

  const timesNewRomanFont = await pdfDoc.embedFont(
    PDFLib.StandardFonts.TimesRoman
  );

  const textInput = document.getElementById("course_code").value;
  const textInputTemp = course_details[textInput].name;
  const courseCode = course_details[textInput].code;

  const page = pdfDoc.getPages()[0];
  page.drawText(textInputTemp, {
    x: 210,
    y: 350,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(courseCode, {
    x: 210,
    y: 317,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });

  const assignmentName = document.getElementById("assign_name").value;
  page.drawText(assignmentName, {
    x: 210,
    y: 284,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });

  const rollNumber = document.getElementById("roll").value;
  const studentName = student_data["n" + rollNumber].name;
  const studentSection = student_data["n" + rollNumber].section;
  const studentSeries = student_data["n" + rollNumber].series + "";
  page.drawText(studentName, {
    x: 120,
    y: 185,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });
  page.drawText(rollNumber, {
    x: 110,
    y: 170,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });
  page.drawText(studentSection, {
    x: 130,
    y: 153,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });
  page.drawText(studentSeries, {
    x: 120,
    y: 135,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });

  const teacherName = document.getElementById("teacher_name").value;
  const teacherNameText = teacher_list[teacherName].name;
  const teacherDesignation = teacher_list[teacherName].designation;
  page.drawText(teacherNameText, {
    x: 320,
    y: 185,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });
  page.drawText(teacherDesignation, {
    x: 320,
    y: 170,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });
  page.drawText("Rajshahi University of Engineering and", {
    x: 320,
    y: 155,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });
  page.drawText("Technology", {
    x: 320,
    y: 140,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });

  const DateOfSubmission = document.getElementById("date_assign").value;
  page.drawText(DateOfSubmission, {
    x: 210,
    y: 75,
    size: 12,
    font: timesNewRomanFont,
    color: PDFLib.rgb(0, 0, 0),
  });

  const modifiedPDFBytes = await pdfDoc.save();
  const blob = new Blob([modifiedPDFBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = assignmentName + " Assignment.pdf";
  link.click();

  URL.revokeObjectURL(url);

  button.innerText = "Generate PDF";
}

async function downloadAssignment() {
  const button = document.querySelector(".assdow");
  button.innerText = "Downloading...";

  const fileUrl = "https://smartcoverbuilder.000webhostapp.com/Assignment.pdf";

  const response = await fetch(fileUrl);
  const pdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

  const modifiedPDFBytes = await pdfDoc.save();
  const blob = new Blob([modifiedPDFBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Assignment.pdf";
  link.click();

  URL.revokeObjectURL(url);

  button.innerText = "Assignment";
}
