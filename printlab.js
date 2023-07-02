async function MakeLabCover() {
  const fileInput = document.getElementById("pdfFileInputLab");
  const textInput = document.getElementById("course_code_lab").value;
  const textInputTemp = course_details[textInput].name;

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function () {
    const pdfBytes = new Uint8Array(reader.result);
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    const timesNewRomanFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.TimesRoman
    );

    const page = pdfDoc.getPages()[0];
    page.drawText(textInputTemp, {
      x: 210,
      y: 350,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const courseCode = course_details[textInput].code;
    page.drawText(courseCode, {
      x: 210,
      y: 317,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const experimentNumber = document.getElementById("experiment_number").value;
    page.drawText(experimentNumber, {
      x: 210,
      y: 284,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const experimentName = document.getElementById("experiment_name").value;
    page.drawText(experimentName, {
      x: 210,
      y: 251,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const rollNumber = document.getElementById("roll_lab").value;
    const studentName = student_data["n" + rollNumber].name;
    const studentSection = student_data["n" + rollNumber].section;
    const studentSeries = student_data["n" + rollNumber].series + "";
    page.drawText(studentName, {
      x: 120,
      y: 170,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber, {
      x: 110,
      y: 153,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSection, {
      x: 130,
      y: 135,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSeries, {
      x: 120,
      y: 120,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const teacherName = document.getElementById("teacher_name_lab").value;
    const teacherNameText = teacher_list[teacherName].name;
    const teacherDesignation = teacher_list[teacherName].designation;
    page.drawText(teacherNameText, {
      x: 320,
      y: 170,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(teacherDesignation, {
      x: 320,
      y: 155,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Rajshahi University of Engineering and", {
      x: 320,
      y: 140,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Technology", {
      x: 320,
      y: 125,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const DateOfSubmission=document.getElementById("date_lab").value;
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
    link.download = experimentName+" Lab Cover.pdf";
    link.click();

    URL.revokeObjectURL(url);
  };

  reader.readAsArrayBuffer(file);
}
