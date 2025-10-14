import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Loader, AlertCircle } from 'lucide-react';

const PhotoDetail = ({ photoId, onBack }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://picsum.photos/id/${photoId}/info`
        );
        
        if (!response.ok) throw new Error('Failed to fetch photo details');
        
        const data = await response.json();
        data.download_url = data.download_url.replace(/\/\d+\/\d+$/, '/1200/800');
        setPhoto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetail();
  }, [photoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <p className="text-red-800 text-center mb-4">
            {error || 'Photo not found'}
          </p>
          <button
            onClick={onBack}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium">Back to Gallery</span>
          </button>
        </div>
      </header>

      {/* Photo Detail */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Full Size Image */}
          <div className="w-full max-h-[80vh] flex justify-center items-center">
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Photo Information */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Photo #{photo.id}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <Camera size={20} />
                  <p className="text-lg">by <span className="font-semibold">{photo.author}</span></p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Dimensions
                </h3>
                <p className="text-lg text-gray-900">
                  {photo.width} × {photo.height}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Author
                </h3>
                <p className="text-lg text-gray-900">{photo.author}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Original URL
                </h3>
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 break-all"
                >
                  {photo.url}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 leading-relaxed">
                This beautiful photograph was captured by {photo.author}. 
                The image showcases stunning composition and visual appeal, 
                available through the Lorem Picsum collection for creative projects.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetail;