import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { runDocumentAudit } from '../../services/ai/aiFeatures';
import { ScanLine, Upload, FileImage, CheckCircle, XCircle, Loader2, AlertTriangle, Eye, FileText } from 'lucide-react';

const DOC_TYPES = [
  { value: 'rccm', label: 'RCCM', desc: 'Registre du Commerce' },
  { value: 'niu', label: 'NIU', desc: 'Numéro d\'Identifiant Unique' },
  { value: 'patente', label: 'Patente', desc: 'Licence commerciale' },
  { value: 'attestation_cnps', label: 'CNPS', desc: 'Attestation de conformité' },
];

export default function OCRDocumentUpload({ onDocumentValidated }) {
  const [selectedType, setSelectedType] = useState('rccm');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const dropRef = useRef();
  const inputRef = useRef();

  const handleFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setError(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  }, [handleFile]);

  const handleAnalyze = useCallback(async () => {
    if (!file || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsFallback(false);
    try {
      const res = await runDocumentAudit({ file, document_type: selectedType });
      if (res.success) {
        setResult(res.data);
        setIsFallback(!!res._fallback);
        if (res.data?.is_valid && onDocumentValidated) {
          onDocumentValidated({ type: selectedType, data: res.data });
        }
      } else {
        setError(res.error?.message || 'Erreur lors de l\'audit');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [file, selectedType, isLoading, onDocumentValidated]);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const isValid = result?.is_valid;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ScanLine size={22} className="text-indigo-500" />
          Audit Visuel de Documents
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          L'IA analyse vos documents administratifs via vision OCR (Llama 4 Scout)
        </p>
      </div>

      {/* Sélection type doc */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DOC_TYPES.map(dt => (
          <button
            key={dt.value}
            onClick={() => setSelectedType(dt.value)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedType === dt.value
                ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`text-sm font-bold ${selectedType === dt.value ? 'text-indigo-600' : 'text-gray-800'}`}>
              {dt.label}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{dt.desc}</div>
          </button>
        ))}
      </div>

      {/* Zone de drop */}
      {!file ? (
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
              <Upload size={24} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <div>
              <p className="font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">
                Déposez votre document ici
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG — Taille max 10 Mo</p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <FileImage size={15} className="text-indigo-500" />
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{file.name}</span>
              <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(0)} Ko)</span>
            </div>
            <button onClick={reset} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors text-xs">
              Changer
            </button>
          </div>

          {/* Preview */}
          <div className="relative flex items-center justify-center bg-gray-50 p-4" style={{ minHeight: 180 }}>
            <img
              src={preview}
              alt="Document"
              className="max-h-48 max-w-full rounded-lg shadow-sm object-contain"
            />
            <div className="absolute top-3 right-3">
              <span className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <Eye size={11} />
                {DOC_TYPES.find(d => d.value === selectedType)?.label}
              </span>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-gray-100">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm"
            >
              {isLoading ? <><Loader2 size={15} className="animate-spin" /> Analyse OCR en cours…</> : <><ScanLine size={15} /> Lancer l'audit IA</>}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {isFallback && <p className="text-center text-xs text-amber-500">⚡ Mode démo actif</p>}

            {/* Statut global */}
            <div className={`rounded-2xl border p-5 flex items-start gap-4 ${
              isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              {isValid
                ? <CheckCircle size={22} className="text-green-500 flex-shrink-0 mt-0.5" />
                : <XCircle size={22} className="text-red-500 flex-shrink-0 mt-0.5" />
              }
              <div>
                <h3 className={`font-bold text-sm ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                  Document {isValid ? 'conforme ✓' : 'non conforme ✗'}
                </h3>
                <p className={`text-sm mt-0.5 ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                  {result.compliance_report?.remarques || result.compliance_report?.status}
                </p>
              </div>
            </div>

            {/* Informations extraites */}
            {result.extracted_info && Object.keys(result.extracted_info).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
                  <FileText size={15} className="text-indigo-500" />
                  <h3 className="font-semibold text-gray-800 text-sm">Informations extraites par OCR</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {Object.entries(result.extracted_info).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between px-5 py-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{val || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Niveau de confiance OCR */}
            {result.niveauConfianceOCR != null && (
              <div className="flex items-center gap-3 px-1">
                <span className="text-xs text-gray-500">Confiance OCR</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600"
                    style={{ width: `${result.niveauConfianceOCR * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-indigo-600">
                  {Math.round(result.niveauConfianceOCR * 100)}%
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
