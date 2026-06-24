"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { MediaManager } from "@/components/admin/MediaManager";

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);

    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          setProduct(data);
          setFeatures(data.features ? JSON.parse(data.features) : []);
          setVideoUrl(data.videoUrl || "");

          // Parse images: first is featured, rest are gallery
          if (data.images) {
            const imgs = JSON.parse(data.images);
            if (imgs.length > 0) {
              setFeaturedImage(imgs[0]);
              setGalleryImages(imgs.slice(1));
            }
          }
        });
    }
  }, [params.id]);

  function addFeature() {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  }

  function removeFeature(i: number) {
    setFeatures(features.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const allImages = featuredImage ? [featuredImage, ...galleryImages] : galleryImages;

    const body = {
      name: form.get("name"),
      categoryId: form.get("categoryId"),
      price: parseFloat(form.get("price") as string) || null,
      originalPrice: form.get("originalPrice") ? parseFloat(form.get("originalPrice") as string) : null,
      description: form.get("description"),
      shortDescription: form.get("shortDescription"),
      dimensions: form.get("dimensions"),
      weight: form.get("weight"),
      stockQuantity: parseInt(form.get("stockQuantity") as string) || 0,
      status: form.get("status") || "active",
      features: features.length > 0 ? features : undefined,
      images: allImages.length > 0 ? allImages : undefined,
      videoUrl: videoUrl || undefined,
    };

    await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);
    router.push("/admin/products");
  }

  if (!product) {
    return <div className="text-brand-400 p-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-900">Edit Product</h1>
        <p className="text-brand-500 mt-1">Update product details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">Product Name *</label>
              <Input name="name" defaultValue={product.name} required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">Short Description</label>
              <Input name="shortDescription" defaultValue={product.shortDescription || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Category</label>
              <Select name="categoryId" defaultValue={product.categoryId}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Status</label>
              <Select name="status" defaultValue={product.status}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Pricing & Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Price (₹)</label>
              <Input name="price" type="number" step="0.01" defaultValue={product.price || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Original Price (₹)</label>
              <Input name="originalPrice" type="number" step="0.01" defaultValue={product.originalPrice || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Dimensions</label>
              <Input name="dimensions" defaultValue={product.dimensions || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Weight</label>
              <Input name="weight" defaultValue={product.weight || ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Stock</label>
              <Input name="stockQuantity" type="number" defaultValue={product.stockQuantity || 0} />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Images & Video</h2>
          <MediaManager
            featuredImage={featuredImage}
            galleryImages={galleryImages}
            videoUrl={videoUrl}
            onFeaturedImageChange={setFeaturedImage}
            onGalleryImagesChange={setGalleryImages}
            onVideoUrlChange={setVideoUrl}
          />
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Features</h2>
          <div className="flex gap-2">
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Add a feature"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            />
            <Button type="button" variant="outline" onClick={addFeature} className="shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-brand-50 rounded-lg px-3 py-1.5 text-sm text-brand-700">
                  {f}
                  <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Description</h2>
          <Textarea name="description" rows={4} defaultValue={product.description || ""} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-brand-700 to-brand-800 hover:from-brand-800 hover:to-brand-900 text-white px-8">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
