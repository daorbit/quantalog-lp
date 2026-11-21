export function printInvoice(fileName: string): void {
  const previous = document.title;
  const restore = () => {
    document.title = previous;
  };
  document.title = fileName;
  window.addEventListener("afterprint", restore, { once: true });
  window.print();
}
