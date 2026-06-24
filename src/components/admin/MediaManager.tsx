"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { getDirectImageUrl, getVideoEmbed } from "@/lib/utils";

interface MediaManagerProps {
  featuredImage: string;
  galleryImages: string[];
  videoUrl: string;
  onFeaturedImageChange: (url: string) => void;
  onGalleryImagesChange: (urls: string[]) => void;
  onVideoUrlChange: (url: string) => void;
}

function ImagePreview({ url, onRemove, label }: { url: string; onRemove?: () => void; label?: string }) {
  const [imgError, setImgError] = useState(false);
  const displayUrl = getDirectImageUrl(url);

  return (
    <div className="relative group">
      {label && (
        <span className="absolute top-2 left-2 z-10 bg-brand-800/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
          {label}
        </span>
      )}
      <div className="aspect-square rounded-xl overflow-hidden border-2 border-brand-100 bg-brand-50">
        {!imgError ? (
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-brand-100 gap-1">
            <ImageIcon className="h-8 w-8 text-brand-300" />
            <span className="text-[10px] text-brand-400 text-center px-2 break-all line-clamp-2">{url}</span>
          </div>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function VideoPreview({ url }: { url: string }) {
  const embedUrl = getVideoEmbed(url);
  if (!embedUrl) return null;

  return (
    <div className="mt-3">
      <div className="aspect-video rounded-xl overflow-hidden border-2 border-brand-100 bg-brand-950">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function MediaManager({
  featuredImage,
  galleryImages,
  videoUrl,
  onFeaturedImageChange,
  onGalleryImagesChange,
  onVideoUrlChange,
}: MediaManagerProps) {
  const [featuredInput, setFeaturedInput] = useState("");
  const [galleryInputs, setGalleryInputs] = useState<string[]>([""]);
  const [videoInput, setVideoInput] = useState(videoUrl);

  function addFeaturedImage() {
    if (featuredInput.trim()) {
      onFeaturedImageChange(featuredInput.trim());
      setFeaturedInput("");
    }
  }

  function updateGalleryInput(index: number, value: string) {
    const updated = [...galleryInputs];
    updated[index] = value;
    setGalleryInputs(updated);
  }

  function confirmGalleryImage(index: number) {
    const url = galleryInputs[index]?.trim();
    if (!url) return;

    const updatedImages = [...galleryImages];
    updatedImages[index] = url;
    onGalleryImagesChange(updatedImages);

    // Add a new empty input slot if under 5 and not already there
    if (galleryInputs.length < 5 && index === galleryInputs.length - 1) {
      setGalleryInputs([...galleryInputs, ""]);
    }
  }

  function removeGalleryImage(index: number) {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(updatedImages);

    // Remove the input and shift
    const updatedInputs = galleryInputs.filter((_, i) => i !== index);
    if (updatedInputs.length === 0) updatedInputs.push("");
    setGalleryInputs(updatedInputs);
  }

  function removeFeaturedImage() {
    onFeaturedImageChange("");
  }

  function handleVideoChange(value: string) {
    setVideoInput(value);
    onVideoUrlChange(value);
  }

  return (
    <div className="space-y-6">
      {/* Featured Image */}
      <div>
        <label className="block text-sm font-semibold text-brand-700 mb-2">
          Featured Image
        </label>
        <div className="flex gap-3">
          <Input
            value={featuredInput}
            onChange={(e) => setFeaturedInput(e.target.value)}
            placeholder="Paste image URL (Google Drive, direct link, etc.)"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeaturedImage())}
          />
          <Button type="button" variant="outline" onClick={addFeaturedImage} className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {featuredImage && (
          <div className="mt-3 max-w-[180px]">
            <ImagePreview url={featuredImage} onRemove={removeFeaturedImage} label="Featured" />
          </div>
        )}
      </div>

      {/* Gallery Images */}
      <div>
        <label className="block text-sm font-semibold text-brand-700 mb-2">
          Gallery Images <span className="text-brand-400 font-normal">({galleryImages.length}/5)</span>
        </label>

        {/* Existing gallery images */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-5 gap-3 mb-3">
            {galleryImages.map((url, i) => (
              <ImagePreview
                key={`gallery-${i}`}
                url={url}
                onRemove={() => removeGalleryImage(i)}
                label={`#${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Input slots */}
        {galleryInputs.map((input, i) => {
          const isConfirmed = i < galleryImages.length;
          return (
            <div key={`input-${i}`} className="flex gap-3 mb-2">
              <div className="flex items-center gap-2 text-xs font-medium text-brand-400 shrink-0 w-16">
                <ImageIcon className="h-3.5 w-3.5" />
                Slot {i + 1}
              </div>
              <Input
                value={isConfirmed ? galleryImages[i] : input}
                onChange={(e) => updateGalleryInput(i, e.target.value)}
                placeholder={isConfirmed ? "" : "Paste image URL"}
                disabled={isConfirmed}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), confirmGalleryImage(i))}
                className={isConfirmed ? "bg-green-50 border-green-200 text-green-700" : ""}
              />
              {isConfirmed ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeGalleryImage(i)}
                  className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => confirmGalleryImage(i)}
                  className="shrink-0"
                  disabled={!input.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-semibold text-brand-700 mb-2">
          Video URL <span className="text-brand-400 font-normal">(YouTube or Google Drive)</span>
        </label>
        <Input
          value={videoInput}
          onChange={(e) => handleVideoChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... or Google Drive link"
        />
        {videoInput && getVideoEmbed(videoInput) && (
          <VideoPreview url={videoInput} />
        )}
      </div>
    </div>
  );
}
