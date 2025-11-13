import { Star, X, Trash2, ExternalLink, Plus } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Image from "next/image";
import { useState } from "react";

export interface Favorite {
  id: string;
  name: string;
  url: string;
  platform: "facebook" | "instagram";
  avatar?: string;
  addedAt: number;
}

interface FavoritesPanelProps {
  onClose: () => void;
  onSelectUrl: (url: string) => void;
}

export default function FavoritesPanel({ onClose, onSelectUrl }: FavoritesPanelProps) {
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>("favorites", []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFavorite, setNewFavorite] = useState({ name: "", url: "" });

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const addFavorite = () => {
    if (!newFavorite.name || !newFavorite.url) return;

    const platform: "facebook" | "instagram" = newFavorite.url.includes("instagram") ? "instagram" : "facebook";
    
    const favorite: Favorite = {
      id: Date.now().toString(),
      name: newFavorite.name,
      url: newFavorite.url,
      platform,
      addedAt: Date.now(),
    };

    setFavorites([...favorites, favorite]);
    setNewFavorite({ name: "", url: "" });
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl overflow-hidden h-full sm:h-auto sm:max-h-[85vh] flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              Favorites
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors touch-manipulation"
              aria-label="Add favorite"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
              aria-label="Close favorites"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Add Form */}
          {showAddForm && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                Add New Favorite
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name (e.g., 'Tasty Recipes')"
                  value={newFavorite.name}
                  onChange={(e) => setNewFavorite({ ...newFavorite, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Profile URL"
                  value={newFavorite.url}
                  onChange={(e) => setNewFavorite({ ...newFavorite, url: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addFavorite}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewFavorite({ name: "", url: "" });
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Favorites List */}
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                No Favorites Yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Save your favorite channels for quick access
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Your First Favorite
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                        {favorite.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">
                        {favorite.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-0.5 rounded-full ${
                          favorite.platform === 'facebook' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                            : 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
                        }`}>
                          {favorite.platform}
                        </span>
                        <span>•</span>
                        <span>{new Date(favorite.addedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSelectUrl(favorite.url)}
                        className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors touch-manipulation"
                        title="Use URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFavorite(favorite.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors touch-manipulation"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}







