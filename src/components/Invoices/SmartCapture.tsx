"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Invoice } from "@/types";

interface SmartCaptureProps {
    onCapture: (data: Partial<Invoice>) => void;
}

export function SmartCapture({ onCapture }: SmartCaptureProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState("");

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFile = (file: File) => {
        setStatus('processing');
        setFileName(file.name);

        // Simulate OCR Processing
        setTimeout(() => {
            // Mock extracted data
            const mockData: Partial<Invoice> = {
                // Randomly pick a client ID for demo purposes, or leave blank to force user matching
                // For this demo, let's simulate extracting a known vendor (Acme Corp -> c1)
                clientId: 'c1',
                items: [
                    { id: crypto.randomUUID(), description: 'Web Development Services', quantity: 1, price: 5000 },
                    { id: crypto.randomUUID(), description: 'Server Maintenance', quantity: 2, price: 150 }
                ],
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
            };

            setStatus('success');
            onCapture(mockData);
        }, 2000);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
            processFile(file);
        } else {
            alert("Please upload a PDF or Image file.");
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    return (
        <div
            className={`
                relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                ${isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
                ${status === 'processing' ? 'bg-slate-50' : ''}
                ${status === 'success' ? 'border-green-500 bg-green-50/30' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                onChange={handleFileInput}
                disabled={status === 'processing'}
            />

            <div className={`space-y-4 ${status === 'processing' ? 'opacity-50' : ''}`}>
                <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 transition-transform duration-300 transform group-hover:scale-110">
                    {status === 'success' ? <CheckCircle size={24} className="text-green-600" /> :
                        status === 'error' ? <AlertCircle size={24} className="text-red-600" /> :
                            <Upload size={24} />}
                </div>

                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {status === 'success' ? 'Scan Complete!' : 'Smart Invoice Capture'}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        {status === 'success' ? `Successfully extracted data from ${fileName}` :
                            "Drag and drop your invoice here, or click to browse. We'll extract the data automatically."}
                    </p>
                </div>

                {status === 'idle' && (
                    <div className="flex justify-center gap-4 text-xs text-slate-400 font-medium pt-2">
                        <span className="flex items-center gap-1"><FileText size={12} /> PDF</span>
                        <span className="flex items-center gap-1"><FileText size={12} /> JPG</span>
                        <span className="flex items-center gap-1"><FileText size={12} /> PNG</span>
                    </div>
                )}
            </div>

            {status === 'processing' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl backdrop-blur-sm z-10">
                    <Loader2 size={40} className="text-indigo-600 animate-spin mb-3" />
                    <p className="font-semibold text-indigo-900">Analysis in progress...</p>
                    <p className="text-xs text-indigo-600/80">Extracting vendor, items, and dates</p>
                </div>
            )}
        </div>
    );
}
