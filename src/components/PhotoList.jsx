import { Camera, AlertCircle, Loader } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import PhotoCard from "./PhotoCard";

const PhotoList = ({ onPhotoClick }) => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef();
  const lastPhotoRef = useRef();

  const fetchPhotos = useCallback(async (pageNum) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=20`
      );
      
      if (!response.ok) throw new Error('Failed to fetch photos');
      
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos(prev => pageNum === 1 ? data : [...prev, ...data]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchPhotos(1);
  }, []);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (lastPhotoRef.current) {
      observer.observe(lastPhotoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, photos]);

  useEffect(() => {
    if (page > 1) {
      fetchPhotos(page);
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Camera className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
          </div>
          <p className="text-gray-600 mt-2">Beautiful photos from Lorem Picsum</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={index === photos.length - 1 ? lastPhotoRef : null}
            >
              <PhotoCard photo={photo} onClick={onPhotoClick} />
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-indigo-600" size={40} />
          </div>
        )}

        {/* End of List */}
        {!hasMore && photos.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              You've reached the end!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoList;