import React, { useState } from 'react';
import {
  Search,
  Trash2,
  ArrowRight,
  Link2,
  Check,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { ReelProject, ReelStoryboard } from '../../shared/types.js';
import { getShareableUrl, getShareableLibraryUrl } from '../services/shareUtils.js';

interface LibraryViewProps {
  projects: ReelProject[];
  onSelectProject: (storyboard: ReelStoryboard) => void;
  onDeleteProject: (projectId: string) => void;
  onNavigateToCreate: () => void;
  isSharedLibrary?: boolean;
  onImportSharedLibrary?: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onNavigateToCreate,
  isSharedLibrary,
  onImportSharedLibrary,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedLibraryLink, setCopiedLibraryLink] = useState(false);

  const handleCopyProjectLink = (storyboard: ReelStoryboard) => {
    const url = getShareableUrl(storyboard);
    navigator.clipboard.writeText(url);
    setCopiedId(storyboard.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyEntireLibraryLink = () => {
    const url = getShareableLibraryUrl(projects);
    navigator.clipboard.writeText(url);
    setCopiedLibraryLink(true);
    setTimeout(() => setCopiedLibraryLink(false), 2500);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onNavigateToCreate}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>New Reel</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyEntireLibraryLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 transition-colors"
            title="Copy shareable link for this entire library"
          >
            {copiedLibraryLink ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{copiedLibraryLink ? 'Link Copied' : 'Share Library'}</span>
          </button>

          <button
            onClick={onNavigateToCreate}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Reel</span>
          </button>
        </div>
      </div>

      {/* Shared Library Notification Banner */}
      {isSharedLibrary && (
        <div className="mb-6 p-4 rounded-lg bg-stone-100 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-700 font-medium">
            Viewing shared Joy University Library ({projects.length} storyboards).
          </span>
          {onImportSharedLibrary && (
            <button
              onClick={onImportSharedLibrary}
              className="px-3 py-1.5 rounded bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
            >
              Save All to My Local Library
            </button>
          )}
        </div>
      )}

      {/* Header & Filter Bar */}
      <div className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
              Archive & History
            </span>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">
              Reel Production Library
            </h1>
          </div>
          <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded w-fit">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {/* Search & Filter */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, topic, or tag..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-medium px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded text-stone-700 focus:outline-none focus:bg-white cursor-pointer"
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
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-lg p-10 text-center text-stone-400">
            <p className="text-sm font-semibold text-stone-700">No storyboards found</p>
            <p className="text-xs text-stone-500 mt-1">
              {searchQuery
                ? `No saved reels match "${searchQuery}".`
                : 'Your library is currently empty. Generate a reel to get started.'}
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const latestVersion =
              project.versions.find((v) => v.id === project.currentVersionId) ||
              project.versions[project.versions.length - 1];

            return (
              <div
                key={project.id}
                className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 hover:border-stone-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div
                  onClick={() => {
                    if (latestVersion) onSelectProject(latestVersion);
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-stone-900 hover:text-[#AF1E2A] transition-colors">
                      {project.title}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-1">
                    {latestVersion?.creativeAngle || 'Production ready 6-shot storyboard'}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] font-mono text-stone-400">
                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>v{latestVersion?.version || 1}.0</span>
                    <span>·</span>
                    <span>{latestVersion?.duration}</span>
                    <span>·</span>
                    <span>{latestVersion?.creativeDirection}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                  {latestVersion && (
                    <button
                      onClick={() => handleCopyProjectLink(latestVersion)}
                      className="px-2.5 py-1.5 rounded border border-stone-200 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors flex items-center gap-1"
                      title="Copy link"
                    >
                      {copiedId === latestVersion.id ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Link2 className="w-3.5 h-3.5" />}
                      <span>{copiedId === latestVersion.id ? 'Copied' : 'Link'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (latestVersion) onSelectProject(latestVersion);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded transition-colors"
                    title="Delete saved reel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
