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
  Discovery: ['bg-amber-50', 'text-amber-700', 'border-amber-200'],
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
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Navigation & Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onNavigateToCreate}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>New reel</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
            Reel ideas
          </span>
        </div>
      </div>

      {/* Header & Filter Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-100/80 text-amber-800 border border-amber-200 shadow-2xs">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-0.5">
                Joy University • Creative Bank
              </span>
              <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                Find your next reel idea
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Choose a channel goal: Trust, Connection, or Discovery. Then find a topic to create your reel.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Classification Filter Pills */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reel ideas..."
              aria-label="Search reel topics"
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 text-stone-900 placeholder:text-stone-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Classification Tabs */}
          <div role="group" aria-label="Channel goal" className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              aria-pressed={selectedCat === 'all'}
              onClick={() => setSelectedCat('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

      {/* Main Categories & Titles Grid */}
      <div className="space-y-10">
        {totalFilteredCount === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500">
            <Sparkles className="w-9 h-9 text-stone-300 mx-auto mb-2" />
            <p className="text-base font-bold text-stone-800">No ideas found matching "{searchQuery}"</p>
            <p className="text-xs text-stone-400 mt-1">Try searching for different keywords or clear your search query.</p>
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
                    <div key={subcat.name} className="space-y-3.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wide">
                        <Layers className="w-3.5 h-3.5 text-stone-400" />
                        <span>{subcat.name}</span>
                        <span className="text-[10px] font-mono font-semibold text-stone-400 px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                          {subcat.ideas.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {subcat.ideas.map((idea) => (
                          <button
                            key={idea.id}
                            aria-label={`Create reel: ${idea.title}`}
                            title="Create a reel from this idea"
                            onClick={() => onSelectIdea(idea.title, idea.direction, idea.channel)}
                            className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-white hover:bg-amber-50/70 hover:border-amber-300 text-left transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-amber-950 leading-snug pr-3">
                              {idea.title}
                              <span className="block mt-1 text-[10px] font-normal text-stone-500">Suggested treatment: {idea.direction}</span>
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-amber-600 group-hover:text-white text-stone-400 flex items-center justify-center flex-shrink-0 transition-colors shadow-2xs">
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
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
