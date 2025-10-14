import { Camera } from 'lucide-react';

const PhotoCard = ({ photo, onClick }) => (
  <div
    onClick={() => onClick(photo.id)}
    className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="aspect-square overflow-hidden bg-gray-200">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/400`}
        alt={`Photo by ${photo.author}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Camera size={16} />
        <p className="text-sm font-medium truncate">{photo.author}</p>
      </div>
    </div>
  </div>
);

export default PhotoCard;