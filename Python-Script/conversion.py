import subprocess

subprocess.run(['pip', 'install', 'python-docx'])# remove this is python-docx module installed 
subprocess.run(['pip', 'install', 'reportlab'])# remove this is reportlab module installed 

from docx import Document
from reportlab.pdfgen import canvas

def convert_docx_to_pdf(input_docx, output_pdf):
    # Read the Word document
    doc = Document(input_docx)

    # Create a PDF file
    pdf = canvas.Canvas(output_pdf)

    # Iterate through paragraphs in the Word document and write them to the PDF
    for paragraph in doc.paragraphs:
        pdf.drawString(100, 800, paragraph.text)
        pdf.showPage()  # Start a new page for each paragraph

    # Save the PDF file
    pdf.save()

if __name__ == "__main__":
    input_docx_file = "word.docx"  #put word file name here but make sure it is in the same directory
    output_pdf_file = "output.pdf"  

    convert_docx_to_pdf(input_docx_file, output_pdf_file)


  # Reference - https://stackoverflow.com/questions/6011115/doc-to-pdf-using-python
  # https://stackoverflow.com/questions/49516592/easily-creating-a-bash-script-in-python
  # https://ioflood.com/blog/python-run-shell-command/python conversion.py
