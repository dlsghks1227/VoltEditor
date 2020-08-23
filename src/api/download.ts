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