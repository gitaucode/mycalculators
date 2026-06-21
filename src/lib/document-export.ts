import { Capacitor } from "@capacitor/core"

export async function printOrSharePdf(selector: string, filename: string) {
  if (!Capacitor.isNativePlatform()) {
    window.print()
    return
  }

  const element = document.querySelector<HTMLElement>(selector)
  if (!element) throw new Error("Document preview was not found")

  const [{ default: html2canvas }, { jsPDF }, { Filesystem, Directory }, { Share }] =
    await Promise.all([
      import("html2canvas"),
      import("jspdf"),
      import("@capacitor/filesystem"),
      import("@capacitor/share"),
    ])

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
    logging: false,
  })
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 8
  const imageWidth = pageWidth - margin * 2
  const imageHeight = (canvas.height * imageWidth) / canvas.width
  const image = canvas.toDataURL("image/jpeg", 0.94)

  let remaining = imageHeight
  let y = margin
  pdf.addImage(image, "JPEG", margin, y, imageWidth, imageHeight)
  remaining -= pageHeight - margin * 2
  while (remaining > 0) {
    pdf.addPage()
    y = margin - (imageHeight - remaining)
    pdf.addImage(image, "JPEG", margin, y, imageWidth, imageHeight)
    remaining -= pageHeight - margin * 2
  }

  const base64 = pdf.output("datauristring").split(",")[1]
  const saved = await Filesystem.writeFile({
    path: filename,
    data: base64,
    directory: Directory.Cache,
  })
  await Share.share({
    title: filename.replace(/\.pdf$/i, ""),
    text: "Created with My Calculators",
    files: [saved.uri],
    dialogTitle: "Print or save PDF",
  })
}
