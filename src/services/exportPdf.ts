import { jsPDF } from 'jspdf';
import { ReelStoryboard } from '../../shared/types.js';

export function exportStoryboardPdf(reel: ReelStoryboard): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc.setFillColor(175, 30, 42); // #AF1E2A Joy University Red
    doc.rect(margin, y, 4, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(175, 30, 42);
    doc.text('JOY UNIVERSITY', margin + 7, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(82, 79, 79); // #524F4F
    doc.text('REEL CREATIVE DIRECTOR — PRODUCTION CALL SHEET', margin + 7, y + 10);

    doc.setFontSize(8);
    doc.setTextColor(120, 113, 108);
    const dateStr = new Date(reel.updatedAt).toLocaleDateString();
    doc.text(dateStr, pageWidth - margin - doc.getTextWidth(dateStr), y + 7);

    y += 18;
    doc.setDrawColor(231, 229, 228);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  // PAGE 1 HEADER
  drawPageHeader();

  // PROJECT TITLE BOX
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(231, 229, 228);
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(28, 25, 23);
  const titleLines = doc.splitTextToSize(reel.reelTitle, contentWidth - 10);
  doc.text(titleLines, margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(82, 79, 79);
  const angleLines = doc.splitTextToSize(`Angle: ${reel.creativeAngle}`, contentWidth - 10);
  doc.text(angleLines, margin + 5, y + 15);

  doc.setFontSize(8);
  doc.setTextColor(120, 113, 108);
  doc.text(
    `Audience: ${reel.targetAudience}  |  Duration: ${reel.duration}  |  Format: ${reel.format}  |  Tone: ${reel.creativeDirection}`,
    margin + 5,
    y + 24
  );

  y += 34;

  // 6 SHOTS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('PRODUCTION SHOT LIST', margin, y);
  y += 6;

  reel.shots.forEach((shot) => {
    // Calculate approximate height
    const visualLines = doc.splitTextToSize(`Visual: ${shot.visual}`, contentWidth - 8);
    const dialogueLines = shot.dialogue ? doc.splitTextToSize(`VO / Spoken: ${shot.dialogue}`, contentWidth - 8) : [];
    const textLines = shot.onscreenText ? doc.splitTextToSize(`On-Screen Text: [${shot.onscreenText}]`, contentWidth - 8) : [];
    const cameraLines = doc.splitTextToSize(`Camera / Action: ${shot.cameraPerformance}`, contentWidth - 8);

    const cardHeight =
      12 +
      visualLines.length * 4.2 +
      (dialogueLines.length ? dialogueLines.length * 4.2 + 2 : 0) +
      (textLines.length ? textLines.length * 4.2 + 2 : 0) +
      cameraLines.length * 4.2 +
      6;

    checkPageOverflow(cardHeight + 4);

    // Card background
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(214, 211, 209);
    doc.roundedRect(margin, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

    // Left accent bar
    doc.setFillColor(175, 30, 42);
    doc.rect(margin, y, 2.5, cardHeight, 'F');

    // Header inside card
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(175, 30, 42);
    doc.text(`SHOT 0${shot.number} — ${shot.name.toUpperCase()}`, margin + 6, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(120, 113, 108);
    const timeWidth = doc.getTextWidth(shot.timestamp);
    doc.text(shot.timestamp, pageWidth - margin - timeWidth - 5, y + 6);

    let cardY = y + 11;

    // Visual
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(40, 40, 40);
    doc.text(visualLines, margin + 6, cardY);
    cardY += visualLines.length * 4.2 + 2;

    // Dialogue
    if (dialogueLines.length) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 25, 23);
      doc.text(dialogueLines, margin + 6, cardY);
      cardY += dialogueLines.length * 4.2 + 2;
    }

    // On-screen text
    if (textLines.length) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(175, 30, 42);
      doc.text(textLines, margin + 6, cardY);
      cardY += textLines.length * 4.2 + 2;
    }

    // Camera
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(82, 79, 79);
    doc.text(cameraLines, margin + 6, cardY);

    y += cardHeight + 4;
  });

  // PRODUCTION NOTES SECTION
  checkPageOverflow(50);
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('DIRECTOR & PRODUCTION NOTES', margin, y);
  y += 6;

  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(231, 229, 228);
  doc.roundedRect(margin, y, contentWidth, 42, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);

  let py = y + 6;
  doc.text(`Visual Style: ${reel.productionNotes.visualStyle}`, margin + 5, py);
  py += 5;
  doc.text(`Locations: ${reel.productionNotes.locations.join(', ')}`, margin + 5, py);
  py += 5;
  doc.text(`Props: ${reel.productionNotes.props.join(', ')}`, margin + 5, py);
  py += 5;
  doc.text(`Camera & Grip: ${reel.productionNotes.camera}`, margin + 5, py);
  py += 5;
  doc.text(`Sound Design: ${reel.productionNotes.sound}`, margin + 5, py);
  py += 5;
  doc.text(`Editing Rhythm: ${reel.productionNotes.editing}`, margin + 5, py);
  py += 5;
  doc.setFont('helvetica', 'bold');
  doc.text(`Complexity: ${reel.productionNotes.complexity}  |  Casting: ${reel.productionNotes.casting}`, margin + 5, py);

  y += 48;

  // SHOOTING PRIORITIES
  checkPageOverflow(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(175, 30, 42);
  doc.text('TOP SHOOTING PRIORITIES', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 40, 40);
  reel.creativeSummary.shootingPriority.forEach((p, idx) => {
    doc.text(`${idx + 1}. ${p}`, margin + 3, y);
    y += 4.5;
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(168, 162, 158);
    doc.text(
      `Joy University — Reel Storyboard Call Sheet  •  Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Trigger download
  const safeFilename = reel.reelTitle
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 30)
    .toLowerCase();
  doc.save(`Joy_Reel_${safeFilename}.pdf`);
}
