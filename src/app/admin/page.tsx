'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, Loader2, Trash2, Plus, FolderSync, LogOut } from 'lucide-react';
import Image from 'next/image';

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

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
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
  };

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
    <div className="min-h-screen bg-black p-6 md:p-12 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 glass-card border-white/5 hover:bg-white/10 transition-all text-[10px] font-black tracking-widest uppercase"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 border-white/5 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Plus className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Add Content</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black tracking-widest text-white/30 uppercase">Event Name (Optional)</label>
                    <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="e.g. Summer Wedding 2024"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-all text-sm font-bold placeholder:text-white/10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black tracking-widest text-white/30 uppercase">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-all text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option>Photography</option>
                      <option>Cinematic</option>
                      <option>Portrait</option>
                      <option>Event</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${files.length > 0 ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-white/20'}`}
                >
                  {files.length > 0 ? (
                    <div className="space-y-4">
                      <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                            <p className="text-[9px] font-black tracking-widest text-blue-400 uppercase truncate w-40">{f.name}</p>
                            <button onClick={() => removeFile(i)} className="text-white/20 hover:text-red-500 transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <label className="block p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all cursor-pointer text-[10px] font-black tracking-widest uppercase">
                        Add More
                        <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-4">
                      <Upload className="w-8 h-8 text-white/10 mx-auto mb-4" />
                      <p className="text-xs font-bold text-white/40 mb-1">Drop or Click</p>
                      <p className="text-[8px] font-black tracking-widest text-white/10 uppercase">Bulk Upload Enabled</p>
                      <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  )}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading}
                    className={`w-full py-5 rounded-2xl font-black tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 uppercase shadow-2xl ${files.length > 0 && !uploading ? 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-blue-500/10' : 'bg-white/5 text-white/20 cursor-not-allowed shadow-none'}`}
                  >
                    {uploading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> {progress}%
                      </span>
                    ) : (
                      'Start Batch Upload'
                    )}
                  </button>

                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-blue-400 font-black tracking-widest text-[9px] uppercase"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Batch Complete
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 lg:col-span-2 space-y-10">
            <div className="flex justify-between items-end border-b border-white/5 pb-8">
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter leading-none uppercase">
                  Manage <br /> Library
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">
                  <FolderSync className="w-3 h-3" /> Real-time Cloud Sync
                </div>
              </div>
              <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase bg-white/5 px-4 py-2 rounded-full border border-white/5">
                {galleryItems.length} ASSETS
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-6" />
                <p className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">Indexing Assets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative aspect-square rounded-[2rem] overflow-hidden glass-card p-1 border-white/5"
                  >
                    <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                      <Image
                        src={item.url}
                        alt="Gallery Item"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(item.id, item.url)}
                          className="p-5 bg-red-600 text-white rounded-full hover:scale-110 hover:bg-red-500 transition-all shadow-2xl"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[8px] font-black tracking-widest text-white uppercase border border-white/10">
                        {item.category}
                      </span>
                      {item.event_name && (
                        <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-[8px] font-black tracking-widest text-white uppercase shadow-lg">
                          {item.event_name}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                {galleryItems.length === 0 && (
                  <div className="col-span-full py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                    <p className="text-sm font-black tracking-[0.3em] text-white/10 uppercase">Library is empty</p>
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
