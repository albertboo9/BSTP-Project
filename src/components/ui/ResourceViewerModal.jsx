import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileIcon,
  Video,
  FileText,
  Download,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import ReactPlayer from "react-player";
import mammoth from "mammoth";
import { clsx } from "clsx";

// Get file type from URL - defined outside component to avoid hoisting issues
const getFileType = (url) => {
  if (!url) return "unknown";
  const ext = url.split(".").pop().toLowerCase();
  if (["pdf"].includes(ext)) return "pdf";
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (["docx", "doc"].includes(ext)) return "docx";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  return "unknown";
};

/**
 * ResourceViewerModal - Modal component for viewing documents, videos, and images
 * Uses simple approaches to avoid complex dependencies:
 * - PDF: Browser native iframe viewer
 * - Video: react-player (without HLS)
 * - DOCX: mammoth conversion
 * - Images: standard img tag
 */
function ResourceViewerModal({ isOpen, onClose, resource, size = "xl" }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docxContent, setDocxContent] = useState(null);

  // Reset state when resource changes
  useEffect(() => {
    if (isOpen && resource) {
      setLoading(true);
      setError(null);
      setDocxContent(null);
    }
  }, [isOpen, resource]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Load DOCX content
  const loadDocx = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocxContent(result.value);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement du document Word");
      setLoading(false);
    }
  }, []);

  // Effect to load DOCX when resource changes
  useEffect(() => {
    if (resource?.type === "docx" || getFileType(resource?.url) === "docx") {
      loadDocx(resource.url);
    }
  }, [resource, loadDocx]);

  if (!isOpen || !resource) return null;

  const fileType = resource.type || getFileType(resource.url);

  const sizeClasses = {
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    full: "max-w-[95vw]",
  };

  // Render loading state
  const renderLoading = () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 text-sm">Chargement en cours...</p>
      </div>
    </div>
  );

  // Render error state
  const renderError = () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-gray-700 font-medium">
          {error || "Erreur de chargement"}
        </p>
        <p className="text-gray-500 text-sm">
          Veuillez télécharger le fichier pour le consulter
        </p>
      </div>
    </div>
  );

  // Render PDF viewer using browser native viewer
  const renderPdfViewer = () => (
    <div className="flex flex-col h-[70vh]">
      <iframe
        src={`${resource.url}#toolbar=1&navpanes=1`}
        className="w-full h-full border-0"
        title={resource.title || "PDF Viewer"}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError("Erreur de chargement du PDF");
          setLoading(false);
        }}
      />
    </div>
  );

  // Render Video viewer
  const renderVideoViewer = () => (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        url={resource.url}
        width="100%"
        height="100%"
        controls
        playing={false}
        onReady={() => setLoading(false)}
        onError={() => {
          setError("Erreur de lecture vidéo");
          setLoading(false);
        }}
        config={{
          file: {
            forceVideo: true,
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );

  // Render DOCX viewer
  const renderDocxViewer = () => (
    <div className="h-[70vh] overflow-auto bg-white p-6">
      {loading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: docxContent }}
        />
      )}
    </div>
  );

  // Render Image viewer
  const renderImageViewer = () => (
    <div className="flex items-center justify-center p-4">
      <img
        src={resource.url}
        alt={resource.title || "Image"}
        className="max-h-[70vh] object-contain rounded-lg"
        onLoad={() => setLoading(false)}
        onError={() => {
          setError("Erreur de chargement de l'image");
          setLoading(false);
        }}
      />
    </div>
  );

  // Render viewer based on file type
  const renderContent = () => {
    if (loading) return renderLoading();
    if (error) return renderError();

    switch (fileType) {
      case "pdf":
        return renderPdfViewer();
      case "video":
        return renderVideoViewer();
      case "docx":
        return renderDocxViewer();
      case "image":
        return renderImageViewer();
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Type de fichier non pris en charge</p>
          </div>
        );
    }
  };

  // Get icon for file type
  const getTypeIcon = () => {
    switch (fileType) {
      case "pdf":
        return FileIcon;
      case "video":
        return Video;
      case "docx":
        return FileText;
      default:
        return FileText;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={clsx(
                "w-full bg-white rounded-2xl shadow-strong overflow-hidden flex flex-col",
                sizeClasses[size],
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TypeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-800 line-clamp-1">
                      {resource.title || "Document"}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      {fileType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resource.url && (
                    <a
                      href={resource.url}
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">{renderContent()}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ResourceViewerModal;
