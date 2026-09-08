import React, { useState } from 'react';
import { X, Search, Trash2, FolderArchive, ArrowRight, Clock, Film, Link2, Check } from 'lucide-react';
import { ReelProject, ReelStoryboard } from '../../shared/types.js';
import { getShareableUrl } from '../services/shareUtils.js';

interface ReelLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ReelProject[];
  onSelectProject: (storyboard: ReelStoryboard) => void;
  onDeleteProject: (projectId: string) => void;
}

export const ReelLibraryModal: React.FC<ReelLibraryModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onDeleteProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyLink = (storyboard: ReelStoryboard) => {
    const url = getShareableUrl(storyboard);
    navigator.clipboard.writeText(url);
    setCopiedId(storyboard.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-[#AF1E2A]" />
            <h2 className="font-extrabold text-stone-900 text-lg tracking-tight">
              Reel Production Library
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
              {projects.length} saved
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-3 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reels by title or topic..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#AF1E2A]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-stone-200 rounded-md text-stone-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Ready for Production">Ready for Production</option>
              <option value="Shot">Shot</option>
              <option value="Edited">Edited</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <Film className="w-10 h-10 mx-auto mb-2 opacity-40 text-stone-400" />
              <p className="text-sm font-semibold">No saved storyboards found.</p>
              <p className="text-xs mt-1">Generate a reel and click "Save" to build your production library.</p>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const latestVersion =
                project.versions.find((v) => v.id === project.currentVersionId) ||
                project.versions[project.versions.length - 1];

              return (
                <div
                  key={project.id}
                  className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
                >
                  <div
                    onClick={() => {
                      if (latestVersion) {
                        onSelectProject(latestVersion);
                        onClose();
                      }
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#AF1E2A] transition-colors">
                        {project.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-1">
                      {latestVersion?.creativeAngle || 'Production ready Reel'}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{project.versions.length} version(s)</span>
                      <span>•</span>
                      <span>{latestVersion?.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {latestVersion && (
                      <button
                        onClick={() => handleCopyLink(latestVersion)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold text-stone-600 hover:text-[#AF1E2A] hover:bg-stone-100 transition-colors"
                        title="Copy direct share link"
                      >
                        {copiedId === latestVersion.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Link2 className="w-3.5 h-3.5 text-stone-500" />
                        )}
                        <span className="hidden sm:inline">
                          {copiedId === latestVersion.id ? 'Copied Link' : 'Share Link'}
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (latestVersion) {
                          onSelectProject(latestVersion);
                          onClose();
                        }
                      }}
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md"
                      title="Open storyboard"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete saved reel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
