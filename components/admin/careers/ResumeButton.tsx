"use client";

import { careerService } from "@/services/career.service";

interface ResumeButtonProps {
  id: number;
}

export default function ResumeButton({
  id,
}: ResumeButtonProps) {

  async function downloadResume() {

    try {

      const blob =
        await careerService.downloadResume(id);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = "resume.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert("Unable to download resume.");

    }

  }

  return (

    <button
      onClick={downloadResume}
      className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
    >
      Resume
    </button>

  );

}