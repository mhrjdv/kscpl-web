"use client";

import ButtonOutline from "./buttonOutline";
import RightArrow from "@/assets/icons/rightArrow";

const DownloadBrochureButton = ({ brochure }) => {
  const handleDownload = async () => {
    if (!brochure?.url) return;
    try {
      // Fetch the brochure as a blob
      const response = await fetch(brochure.url);
      if (!response.ok) {
        throw new Error("Failed to fetch brochure");
      }
      const blob = await response.blob();
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      // Create a temporary anchor element to trigger download
      const a = document.createElement("a");
      a.href = blobUrl;
      // Extract the file name from the URL or default to "brochure.pdf"
      const fileName = brochure.url.split("/").pop() || "brochure.pdf";
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading brochure:", error);
    }
  };

  return (
    <ButtonOutline
      onClick={handleDownload}
      className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary text-sm py-2 px-4"
    >
      Download Brochure{" "}
      <span className="rotate-90">
        <RightArrow height="18" width="16" />
      </span>
    </ButtonOutline>
  );
};

export default DownloadBrochureButton;
