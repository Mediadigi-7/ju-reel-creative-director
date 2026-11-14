import type { ContentChannel } from '../../shared/channels.js';
import { CONTENT_CHANNELS, LIBRARY_IDEAS } from '../../shared/ideaLibrary.js';
import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Smile,
  Flame,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { CreativeDirection } from '../../shared/types.js';

interface IdeasViewProps {
  onSelectIdea: (idea: string, direction?: CreativeDirection, channel?: ContentChannel) => void;
  onNavigateToCreate: () => void;
}

const channelIcons = { Trust: BookOpen, Connection: Smile, Discovery: Flame };
const channelColors = {
  Trust: ['bg-blue-50', 'text-blue-700', 'border-blue-200'],
  Connection: ['bg-purple-50', 'text-purple-700', 'border-purple-200'],
  Discovery: ['bg-amber-50', 'text-amber-700', 'border-stone-200'],
};
const CATEGORIZED_IDEAS = CONTENT_CHANNELS.map(channel => {
  const ideas = LIBRARY_IDEAS.filter(idea => idea.channel === channel.id);
  const groups = [...new Set(ideas.map(idea => idea.topicGroup))];
  const colors = channelColors[channel.id];
  return { ...channel, name: channel.id, icon: channelIcons[channel.id], badgeBg: colors[0], badgeText: colors[1], badgeBorder: colors[2],
    subcategories: groups.map(name => ({ name, ideas: ideas.filter(idea => idea.topicGroup === name) })),
  };
});

export const IdeasView: React.FC<IdeasViewProps> = ({ onSelectIdea, onNavigateToCreate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const query = searchQuery.trim().toLowerCase();

  const filteredCategories = CATEGORIZED_IDEAS.map((cat) => {
    const matchingSubcats = cat.subcategories
      .map((sub) => {
        const matchingIdeas = sub.ideas.filter((idea) =>
          idea.title.toLowerCase().includes(query)
        );
        return { ...sub, ideas: matchingIdeas };
      })
      .filter((sub) => sub.ideas.length > 0);

    return { ...cat, subcategories: matchingSubcats };
  }).filter(
    (cat) =>
      (selectedCat === 'all' || cat.id === selectedCat) &&
      cat.subcategories.length > 0
  );

  const totalFilteredCount = filteredCategories.reduce(
    (acc, cat) => acc + cat.subcategories.reduce((sAcc, sub) => sAcc + sub.ideas.length, 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10">
      {/* Header & Filter Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs">
              <Lightbulb className="w-6 h-6 text-[#8c1618]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                Find your next reel idea
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Search for a student question, then choose an idea. You can review the topic, channel and language before creating a storyboard.
              </p>
            </div>
          </div>
        </div>

        <label htmlFor="idea-search" className="block mt-5 text-sm font-semibold text-stone-700">Search ideas</label>
        {/* Search & Classification Filter Pills */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-stone-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="idea-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reel ideas..."
              aria-label="Search reel topics"
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#8b8680] rounded-lg outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 text-stone-900 placeholder:text-stone-600 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Classification Tabs */}
          <div role="group" aria-label="Channel goal" className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              aria-pressed={selectedCat === 'all'}
              onClick={() => setSelectedCat('all')}
              className={`min-h-11 px-3.5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                selectedCat === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              All topics ({LIBRARY_IDEAS.length})
            </button>
            {CATEGORIZED_IDEAS.map((cat) => {
              const catTotal = cat.subcategories.reduce((acc, sub) => acc + sub.ideas.length, 0);
              return (
                <button
                  key={cat.id}
                  aria-pressed={selectedCat === cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`min-h-11 px-3.5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCat === cat.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {cat.id} ({catTotal})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p role="status" className="mb-5 text-sm text-stone-600">{totalFilteredCount} {totalFilteredCount===1?'idea':'ideas'}{query ? ' matching your search' : ' to explore'}. Open a topic group, then choose an idea to review.</p>
      {/* Main Categories & Titles Grid */}
      <div className="space-y-10">
        {totalFilteredCount === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500">
            <Sparkles className="w-9 h-9 text-stone-300 mx-auto mb-2" />
            <p className="text-base font-bold text-stone-800">No ideas found matching "{searchQuery}"</p>
            <p className="text-xs text-stone-600 mt-1">Try a broader keyword or show all ideas.</p><button onClick={()=>{setSearchQuery('');setSelectedCat('all');}} className="mt-4 min-h-11 px-4 py-2 rounded-lg border border-stone-300 text-sm font-semibold text-stone-800">Clear filters</button>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const IconComp = cat.icon;
            const categoryIdeaCount = cat.subcategories.reduce((acc, sub) => acc + sub.ideas.length, 0);

            return (
              <div key={cat.id} className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6">
                {/* Category Main Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-stone-100 text-stone-800 border border-stone-200">
                      <IconComp className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-stone-900 leading-tight">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${cat.badgeBg} ${cat.badgeText} ${cat.badgeBorder}`}>
                    {categoryIdeaCount} Titles
                  </span>
                </div>

                {/* Subcategories */}
                <div className="space-y-7">
                  {cat.subcategories.map((subcat) => (
                    <details key={subcat.name} open={Boolean(query)} className="border-t border-stone-200 pt-2">
                      <summary className="cursor-pointer min-h-11 rounded text-sm font-semibold text-stone-800 py-3">

                        <span>{subcat.name}</span>
                        <span className="text-[10px] font-mono font-semibold text-stone-600 px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                          {subcat.ideas.length}
                        </span>
                      </summary>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {subcat.ideas.map((idea) => (
                          <button
                            key={idea.id}
                            aria-label={`Choose idea: ${idea.title}`}
                            title="Review this idea before creating"
                            onClick={() => onSelectIdea(idea.title, idea.direction, idea.channel)}
                            className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-400 text-left transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#8c1618] leading-snug pr-3">
                              {idea.title}
                              <span className="block mt-1 text-[10px] font-normal text-stone-500">Suggested style: {idea.direction}</span>
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-[#AF1E2A] group-hover:text-white text-stone-600 flex items-center justify-center flex-shrink-0 transition-colors shadow-2xs">
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
