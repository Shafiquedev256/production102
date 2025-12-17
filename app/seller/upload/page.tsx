"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type MediaFile = {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "video";
  duration?: number;
  sizeMB: number;
};

const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;
const MAX_PDF_SIZE_MB = 10;
const REQUIRED_IMAGES = 4;
const REQUIRED_VIDEOS = 3;
const MAX_VIDEO_SECONDS = 60;

export default function UploadProjectPage() {
  // Form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UGX");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // Media
  const [images, setImages] = useState<MediaFile[]>([]);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [pdf, setPdf] = useState<File | null>(null);

  // Validation / UI state
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs to revoke object URLs on unmount
  const createdUrls = useRef<string[]>([]);

  // Static lists
  const currencies = [
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "RWF", name: "Rwandan Franc" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "ZAR", name: "South African Rand" },
  ];

  const categories = [
    "Fashion & Accessories",
    "Electronics",
    "Food & Beverages",
    "Home & Garden",
    "Health & Beauty",
    "Sports & Outdoors",
    "Books & Media",
    "Toys & Games",
    "Automotive",
    "Services",
  ];

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      createdUrls.current.forEach((u) => URL.revokeObjectURL(u));
      createdUrls.current = [];
    };
  }, []);

  // Utility to create media file
  const makeMediaFile = (
    file: File,
    type: MediaFile["type"],
    duration?: number
  ) => {
    const previewUrl = URL.createObjectURL(file);
    createdUrls.current.push(previewUrl);
    return {
      id: crypto.randomUUID(),
      file,
      previewUrl,
      type,
      sizeMB: Math.round((file.size / 1024 / 1024) * 100) / 100,
      duration,
    } as MediaFile;
  };

  // IMAGE upload
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages: MediaFile[] = [];
    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        setErrors((prev) => [...prev, `${f.name} is not an image.`]);
        continue;
      }
      if (f.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
        setErrors((prev) => [
          ...prev,
          `${f.name} exceeds ${MAX_IMAGE_SIZE_MB}MB.`,
        ]);
        continue;
      }
      newImages.push(makeMediaFile(f, "image"));
    }

    if (images.length + newImages.length > REQUIRED_IMAGES) {
      setErrors((prev) => [
        ...prev,
        `You must upload exactly ${REQUIRED_IMAGES} images.`,
      ]);
      return;
    }

    setImages((prev) => [...prev, ...newImages]);
  };

  // VIDEO upload
  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    for (const f of files) {
      if (!f.type.startsWith("video/")) {
        setErrors((prev) => [...prev, `${f.name} is not a video.`]);
        continue;
      }
      if (f.size / 1024 / 1024 > MAX_VIDEO_SIZE_MB) {
        setErrors((prev) => [
          ...prev,
          `${f.name} exceeds ${MAX_VIDEO_SIZE_MB}MB.`,
        ]);
        continue;
      }

      try {
        const duration = await getVideoDuration(f);
        if (duration > MAX_VIDEO_SECONDS) {
          setErrors((prev) => [
            ...prev,
            `${f.name} exceeds ${MAX_VIDEO_SECONDS}s.`,
          ]);
          continue;
        }
        if (videos.length + 1 > REQUIRED_VIDEOS) {
          setErrors((prev) => [
            ...prev,
            `You must upload exactly ${REQUIRED_VIDEOS} videos.`,
          ]);
          continue;
        }
        setVideos((prev) => [
          ...prev,
          makeMediaFile(f, "video", Math.round(duration * 100) / 100),
        ]);
      } catch {
        setErrors((prev) => [
          ...prev,
          `Could not read duration for ${f.name}.`,
        ]);
      }
    }
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = url;

      const cleanup = () => URL.revokeObjectURL(url);

      video.onloadedmetadata = () => {
        const d = video.duration;
        cleanup();
        if (!isFinite(d)) reject(new Error("Invalid duration"));
        else resolve(d);
      };
      video.onerror = () => {
        cleanup();
        reject(new Error("Failed to load video"));
      };
    });
  };

  // PDF upload
  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      setErrors((prev) => [...prev, "Only PDF files allowed."]);
      return;
    }
    if (f.size / 1024 / 1024 > MAX_PDF_SIZE_MB) {
      setErrors((prev) => [...prev, `PDF exceeds ${MAX_PDF_SIZE_MB}MB.`]);
      return;
    }
    setPdf(f);
  };

  // Remove handlers
  const removeImage = (id: string) =>
    setImages((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((p) => p.id !== id);
    });

  const removeVideo = (id: string) =>
    setVideos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((p) => p.id !== id);
    });

  const removePdf = () => setPdf(null);

  // Validation
  const collectErrors = (): string[] => {
    const errs: string[] = [];
    if (title.trim().length < 4) errs.push("Title is required (min 4 chars).");
    if (description.trim().length < 10)
      errs.push("Description is required (min 10 chars).");
    if (!category) errs.push("Category must be selected.");
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      errs.push("Price must be positive.");
    if (images.length !== REQUIRED_IMAGES)
      errs.push(`Exactly ${REQUIRED_IMAGES} images are required.`);
    if (videos.length !== REQUIRED_VIDEOS)
      errs.push(
        `Exactly ${REQUIRED_VIDEOS} videos (≤ ${MAX_VIDEO_SECONDS}s) are required.`
      );
    return errs;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const errs = collectErrors();
    if (errs.length) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const uploadFile = async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: fd,
          credentials: "include",
        });
        if (!res.ok) throw new Error((await res.text()) || "Upload failed");
        return res.json();
      };

      await Promise.all([
        ...images.map((img) => uploadFile(img.file)),
        ...videos.map((vid) => uploadFile(vid.file)),
        pdf ? uploadFile(pdf) : Promise.resolve(),
      ]);

      setSuccessMessage("Project uploaded successfully.");
      setTitle("");
      setDescription("");
      setCategory("");
      setTags("");
      setPrice("");
      setCurrency("UGX");
      setStatus("draft");
      images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
      videos.forEach((v) => URL.revokeObjectURL(v.previewUrl));
      setImages([]);
      setVideos([]);
      setPdf(null);
    } catch (err: any) {
      setErrors([err.message || "Network error."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='sticky top-0 z-40 bg-white border-b border-gray-200'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img
              src='https://public.readdy.ai/ai/img_res/a362a82c-48ab-46f1-b02a-b78075426798.png'
              alt='Logo'
              className='w-10 h-10 object-contain'
            />
            <div>
              <h1 className='text-lg font-semibold text-gray-900'>
                Upload Project
              </h1>
              <p className='text-sm text-gray-500'>
                Provide all assets affiliates need
              </p>
            </div>
          </div>

          <nav className='flex items-center gap-4 text-sm'>
            <Link href='/' className='text-gray-600 hover:text-gray-900'>
              Dashboard
            </Link>
            <Link href='/upload' className='text-orange-600 font-medium'>
              Upload Project
            </Link>
            <Link href='/media' className='text-gray-600 hover:text-gray-900'>
              Media
            </Link>
            <Link
              href='/settings'
              className='text-gray-600 hover:text-gray-900'
            >
              Settings
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Alerts */}
          <div>
            {errors.length > 0 && (
              <div className='mb-4 space-y-2'>
                {errors.map((err, idx) => (
                  <div
                    key={idx}
                    className='p-3 bg-red-50 border border-red-200 text-red-800 rounded'
                  >
                    {err}
                  </div>
                ))}
              </div>
            )}
            {successMessage && (
              <div className='mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded'>
                {successMessage}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <section className='bg-white p-6 rounded-lg shadow-sm border'>
            <h2 className='text-lg font-semibold mb-4'>Basic Information</h2>
            <div className='grid grid-cols-1 gap-4'>
              <input
                className='w-full px-4 py-2 border rounded-md'
                placeholder='Product / Project Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className='w-full px-4 py-3 border rounded-md min-h-30'
                placeholder='Detailed description for affiliates to use in campaigns...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <select
                  className='px-4 py-2 border rounded-md'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value=''>Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <input
                  className='px-4 py-2 border rounded-md'
                  placeholder='Tags (comma separated)'
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />

                <div className='flex gap-2'>
                  <input
                    className='flex-1 px-4 py-2 border rounded-md'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <select
                    className='px-4 py-2 border rounded-md'
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Images */}
          <section className='bg-white p-6 rounded-lg shadow-sm border'>
            <h2 className='text-lg font-semibold mb-3'>
              Images (exactly {REQUIRED_IMAGES})
            </h2>
            <p className='text-sm text-gray-500 mb-4'>
              Upload exactly {REQUIRED_IMAGES} high-quality images (JPG/PNG).
              Max {MAX_IMAGE_SIZE_MB}MB each.
            </p>
            <div className='mb-4 flex items-center gap-3'>
              <label className='cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50'>
                <input
                  type='file'
                  accept='image/*'
                  multiple
                  className='hidden'
                  onChange={handleImageSelect}
                />
                <span className='text-sm text-gray-700'>Select images</span>
              </label>
              <div className='text-sm text-gray-600'>
                Selected: <strong>{images.length}</strong> / {REQUIRED_IMAGES}
              </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {images.map((img) => (
                <div
                  key={img.id}
                  className='relative border rounded overflow-hidden'
                >
                  <img
                    src={img.previewUrl}
                    alt='preview'
                    className='w-full h-36 object-cover'
                  />
                  <div className='p-2 text-xs text-gray-600'>
                    Size: {img.sizeMB} MB
                  </div>
                  <button
                    type='button'
                    onClick={() => removeImage(img.id)}
                    className='absolute top-2 right-2 bg-white/80 rounded-full p-1 text-red-600'
                  >
                    ×
                  </button>
                </div>
              ))}
              {Array.from({
                length: Math.max(0, REQUIRED_IMAGES - images.length),
              }).map((_, i) => (
                <div
                  key={`ph-${i}`}
                  className='border rounded h-36 flex items-center justify-center text-gray-300'
                >
                  <span>Empty</span>
                </div>
              ))}
            </div>
          </section>

          {/* Videos */}
          <section className='bg-white p-6 rounded-lg shadow-sm border'>
            <h2 className='text-lg font-semibold mb-3'>
              Videos (exactly {REQUIRED_VIDEOS})
            </h2>
            <p className='text-sm text-gray-500 mb-4'>
              Upload exactly {REQUIRED_VIDEOS} real product videos (MP4), max{" "}
              {MAX_VIDEO_SIZE_MB}MB each and max {MAX_VIDEO_SECONDS}s duration.
            </p>
            <div className='mb-4 flex items-center gap-3'>
              <label className='cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50'>
                <input
                  type='file'
                  accept='video/*'
                  multiple
                  className='hidden'
                  onChange={handleVideoSelect}
                />
                <span className='text-sm text-gray-700'>Select videos</span>
              </label>
              <div className='text-sm text-gray-600'>
                Selected: <strong>{videos.length}</strong> / {REQUIRED_VIDEOS}
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className='relative border rounded overflow-hidden'
                >
                  <video
                    controls
                    src={vid.previewUrl}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-2 text-xs text-gray-600'>
                    Duration: {vid.duration ?? "—"}s — Size: {vid.sizeMB} MB
                  </div>
                  <button
                    type='button'
                    onClick={() => removeVideo(vid.id)}
                    className='absolute top-2 right-2 bg-white/80 rounded-full p-1 text-red-600'
                  >
                    ×
                  </button>
                </div>
              ))}
              {Array.from({
                length: Math.max(0, REQUIRED_VIDEOS - videos.length),
              }).map((_, i) => (
                <div
                  key={`vph-${i}`}
                  className='border rounded h-48 flex items-center justify-center text-gray-300'
                >
                  <span>Empty</span>
                </div>
              ))}
            </div>
          </section>

          {/* PDF */}
          <section className='bg-white p-6 rounded-lg shadow-sm border'>
            <h2 className='text-lg font-semibold mb-3'>PDF (optional)</h2>
            <p className='text-sm text-gray-500 mb-4'>
              Upload one PDF document. Max {MAX_PDF_SIZE_MB}MB.
            </p>
            <div className='flex items-center gap-3'>
              <label className='cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50'>
                <input
                  type='file'
                  accept='application/pdf'
                  className='hidden'
                  onChange={handlePdfSelect}
                />
                <span className='text-sm text-gray-700'>Select PDF</span>
              </label>
              {pdf && (
                <div className='flex items-center gap-2 text-gray-700'>
                  <span>{pdf.name}</span>
                  <button
                    type='button'
                    onClick={removePdf}
                    className='text-red-600'
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Submit */}
          <div className='flex justify-end'>
            <button
              type='submit'
              className='px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 disabled:bg-orange-300'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload Project"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
