import jsPDF from "jspdf";

export function downloadDataURL(filename: any, data: any)
{
    const element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const MAPWIDTH = 180;
const MAPHEIGHT = 180;

export function downloadPDF(filename: any, data: any)
{
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.addImage(data, (210 / 2) - (MAPWIDTH / 2), (297 / 2) - (MAPHEIGHT / 2), MAPWIDTH, MAPHEIGHT);
    doc.save(filename)
}