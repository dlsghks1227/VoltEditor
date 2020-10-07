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

const MAPWIDTH = 890;
const MAPHEIGHT = 890;

export function downloadPDF(filename: any, data: any)
{
    const doc = new jsPDF('p', 'px', [MAPWIDTH, MAPHEIGHT]);
    doc.addImage(data, 'PNG', 0, 0, MAPWIDTH, MAPWIDTH);
    doc.save(filename)
}