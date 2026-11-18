'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, Loader2, Trash2, Plus, FolderSync, LogOut, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/components/Logo';

type GalleryItem = {
  id: number;
  url: string;
  category: string;
  event_name?: string | null;
};

export default function Admin() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState('Photography');
  const [eventName, setEventName] = useState('');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.items) setGalleryItems(data.items);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('category', category);
      formData.append('eventName', eventName);

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Upload failed');
      }

      setProgress(100);
      setSuccess(true);
      setFiles([]);
      setEventName('');
      fetchGallery();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      alert(`Upload failed: ${message}`);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (id: number, url: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(
        `/api/admin/gallery?id=${encodeURIComponent(id)}&url=${encodeURIComponent(url)}`,
        { method: 'DELETE' }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Delete failed');
      }

      setGalleryItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Delete failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Dedicated Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" title="Go to Website">
              <Logo className="w-8 h-8" textClassName="text-sm md:text-base" />
            </Link>
            <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-blue-200">
              Admin Portal
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-slate-600 hover:text-blue-600 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 transition-all text-xs font-black tracking-widest uppercase rounded-xl border border-slate-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-20 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black tracking-tight uppercase text-slate-900">Upload Content</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Event Name (Optional)</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Yaounde Gala 2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-blue-500 text-sm font-bold text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-blue-500 text-sm font-bold text-slate-900 appearance-none cursor-pointer"
                  >
                    <option>Photography</option>
                    <option>Cinematic</option>
                    <option>Portrait</option>
                    <option>Event</option>
                  </select>
                </div>

                <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${files.length > 0 ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                  {files.length > 0 ? (
                    <div className="space-y-3">
                      <div className="max-h-36 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs">
                            <p className="font-bold text-slate-700 truncate w-40">{f.name}</p>
                            <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-600 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <label className="block p-2.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all cursor-pointer text-[10px] font-black tracking-widest uppercase text-slate-700">
                        + Add More Photos
                        <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-4">
                      <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2 opacity-80" />
                      <p className="text-xs font-bold text-slate-700 mb-1">Click to select files</p>
                      <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Bulk Upload Supported</p>
                      <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  )}
                </div>

                <button
                  onClick={handleUpload}
                  disabled={files.length === 0 || uploading}
                  className={`w-full py-4 rounded-xl font-black tracking-widest text-xs transition-all flex items-center justify-center gap-2 uppercase shadow-md ${
                    files.length > 0 && !uploading
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Uploading {progress}%
                    </span>
                  ) : (
                    'Upload Selected Assets'
                  )}
                </button>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-emerald-600 font-black tracking-widest text-xs uppercase pt-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Upload Complete!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight uppercase text-slate-900">
                  Media Library
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  <FolderSync className="w-3.5 h-3.5 text-blue-600" /> Real-Time Sync Active
                </div>
              </div>
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                {galleryItems.length} ITEMS
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-200">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Loading assets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative aspect-square rounded-3xl overflow-hidden bg-white p-1.5 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image
                        src={item.url}
                        alt="Gallery Item"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(item.id, item.url)}
                          className="p-4 bg-red-600 text-white rounded-full hover:scale-110 hover:bg-red-700 transition-all shadow-lg"
                          aria-label="Delete image"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black tracking-widest text-slate-900 uppercase border border-slate-200/80 shadow-sm">
                        {item.category}
                      </span>
                      {item.event_name && (
                        <span className="px-2.5 py-1 bg-blue-600 rounded-full text-[8px] font-black tracking-widest text-white uppercase shadow-sm truncate max-w-[120px]">
                          {item.event_name}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                {galleryItems.length === 0 && (
                  <div className="col-span-full py-32 text-center bg-white rounded-3xl border border-slate-200">
                    <p className="text-xs font-black tracking-widest text-slate-400 uppercase">Library is empty</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
