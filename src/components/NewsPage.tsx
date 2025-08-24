import React, { useState, useEffect } from 'react';
import "./NewsPage.css";
import { Search, Heart, TrendingUp, ArrowUp, ExternalLink, Clock, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

function TestThing(){
  return (
    <>
    <h1>"This will make me insane"</h1>
    </>
  )
}


const NewsPage = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [upvotedCelebs, setUpvotedCelebs] = useState(new Set());

  // Mock data for demonstration
  const trendingNews = [
    {
      id: 1,
      celebrity: "Taylor Swift",
      title: "Taylor Swift announces surprise acoustic album during European tour",
      content: "Breaking: Taylor Swift surprised fans during her London show by announcing a brand new acoustic album featuring reimagined versions of her biggest hits...",
      source: "X",
      timestamp: "2h ago",
      trending: true,
      tags: ["Music", "Tour"],
      socialLinks: {
        instagram: "@taylorswift",
        x: "@taylorswift13"
      },
      likes: 1247,
      upvotes: 892
    },
    {
      id: 2,
      celebrity: "Elon Musk",
      title: "Musk reveals new SpaceX mission timeline for Mars colonization",
      content: "In a recent interview, Elon Musk outlined ambitious plans for Mars colonization, stating that the first crewed mission could happen as early as 2028...",
      source: "YouTube",
      timestamp: "4h ago",
      trending: true,
      tags: ["Space", "Technology"],
      socialLinks: {
        instagram: "@elonmusk",
        x: "@elonmusk"
      },
      likes: 2156,
      upvotes: 1543
    },
    {
      id: 3,
      celebrity: "LeBron James",
      title: "LeBron James breaks another NBA record in last night's game",
      content: "The Lakers superstar achieved yet another milestone, becoming the oldest player to record a triple-double in playoff history...",
      source: "ESPN",
      timestamp: "6h ago",
      trending: false,
      tags: ["NBA", "Sports"],
      socialLinks: {
        instagram: "@kingjames",
        x: "@KingJames"
      },
      likes: 3421,
      upvotes: 2187
    },
    {
      id: 4,
      celebrity: "Ariana Grande",
      title: "Ariana Grande spotted in recording studio with mystery collaborator",
      content: "Paparazzi photos show the pop star entering Abbey Road Studios with an unidentified artist, sparking speculation about her next project...",
      source: "Instagram",
      timestamp: "8h ago",
      trending: true,
      tags: ["Music", "Collaboration"],
      socialLinks: {
        instagram: "@arianagrande",
        x: "@ArianaGrande"
      },
      likes: 987,
      upvotes: 654
    },
    {
      id: 5,
      celebrity: "Ninja",
      title: "Ninja announces return to competitive gaming after streaming hiatus",
      content: "The famous streamer revealed plans to compete in upcoming tournaments while maintaining his streaming schedule on multiple platforms...",
      source: "Twitch",
      timestamp: "12h ago",
      trending: false,
      tags: ["Gaming", "Esports"],
      socialLinks: {
        instagram: "@ninja",
        x: "@Ninja"
      },
      likes: 1876,
      upvotes: 1234
    }
  ];

  const userAssets = [
    {
      id: 1,
      celebrity: "Taylor Swift",
      title: "Taylor Swift's merchandise sales hit record numbers this quarter",
      content: "Financial reports show unprecedented growth in merchandise revenue, with limited edition items selling out within minutes of release...",
      source: "Google News",
      timestamp: "3h ago",
      trending: false,
      tags: ["Business", "Merchandise"],
      socialLinks: {
        instagram: "@taylorswift",
        x: "@taylorswift13"
      },
      likes: 542,
      upvotes: 387
    },
    {
      id: 2,
      celebrity: "Elon Musk",
      title: "Tesla stock surges following Musk's latest AI announcement",
      content: "Shares of Tesla jumped 8% in after-hours trading following Elon Musk's presentation on the company's new AI initiatives and autonomous driving updates...",
      source: "Reddit",
      timestamp: "5h ago",
      trending: true,
      tags: ["Tesla", "AI", "Stocks"],
      socialLinks: {
        instagram: "@elonmusk",
        x: "@elonmusk"
      },
      likes: 1832,
      upvotes: 1456
    }
  ];

  const trendingSuggestions = ["Taylor Swift tour", "Elon Musk Mars", "NBA playoffs", "Ariana Grande album", "Gaming tournaments"];

  const currentNews = activeTab === 'trending' ? trendingNews : userAssets;

  const handleLike = (postId: any) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleUpvote = (celebrity: any) => {
    setUpvotedCelebs(prev => {
      const newUpvoted = new Set(prev);
      if (newUpvoted.has(celebrity)) {
        newUpvoted.delete(celebrity);
      } else {
        newUpvoted.add(celebrity);
      }
      return newUpvoted;
    });
  };

  const getSourceIcon = (source: any) => {
    switch(source.toLowerCase()) {
      case 'x': return <Twitter size={16} />;
      case 'instagram': return <Instagram size={16} />;
      case 'youtube': return <Youtube size={16} />;
      case 'twitch': return <Twitch size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  const filteredNews = currentNews.filter(item => 
    item.celebrity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // The actual dynamic page to be returned/displayed
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Celebrity News!</h1>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
          
          {/* Search Bar */}
          {showSearch && (    // If showSearch is true then render the <div> element, if false then ignore
            <div className="mt-3">
              <input      // Search
                type="text"
                placeholder="Search news, celebrities, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery === '' && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Trending searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {trendingSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex mt-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex-1 py-3 text-center font-medium transition-colors relative ${
                activeTab === 'trending' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp size={18} />
                Trending
              </div>
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`flex-1 py-3 text-center font-medium transition-colors relative ${
                activeTab === 'assets' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Your Assets
            </button>
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="max-w-2xl mx-auto">
        {filteredNews.map((item) => (
          <article key={item.id} className="border-b border-gray-800 hover:bg-gray-950/30 transition-colors">
            <div className="p-4">
              {/* Celebrity Header */}
              <div className="TestingB">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.celebrity.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.celebrity}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm  sources">
                      {getSourceIcon(item.source)}
                      <span>{item.source}</span>
                      <Clock size={12} />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
                
              </div>

              {/* Content */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold leading-tight">{item.title}</h2>
                  {item.trending && (
                    <center className = "Testing3">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        TRENDING
                      </span>
                    </center>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, index) => (
                    <center className="tags">
                      <span
                        key={index}
                        className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    </center>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  
                  <button     /* Heart button */
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-2 transition-colors in-line ${
                      likedPosts.has(item.id)
                        ? 'text-red-500'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={18} fill={likedPosts.has(item.id) ? 'currentColor' : 'none'} />
                    <span className="text-sm">{item.likes + (likedPosts.has(item.id) ? 1 : 0)}</span>
                  </button>
                  
                  <button  /* Upvote button */
                    onClick={() => handleUpvote(item.celebrity)}
                    className={`p-2 rounded-full transition-colors ${
                      upvotedCelebs.has(item.celebrity)
                        ? 'text-green-500 bg-green-500/10'
                        : 'text-gray-500 hover:text-green-500 hover:bg-green-500/10'
                    }`}
                  >
                    <ArrowUp size={18} />
                    <span className="text-sm">{item.upvotes + (upvotedCelebs.has(item.celebrity) ? 1 : 0)}</span>
                  </button>

                </div>

                {/* Social Links */}
                <div className="socials">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://instagram.com/${item.socialLinks.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-pink-500 hover:bg-pink-500/10 rounded-full transition-colors"
                    >
                      <Instagram size={30} />
                    </a>
                    <a
                      href={`https://x.com/${item.socialLinks.x.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors"
                    >
                      <Twitter size={30} />
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="max-w-2xl mx-auto p-8 text-center">
          <div className="text-gray-500">
            <Search size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-sm">Try adjusting your search or browse trending topics</p>
          </div>
        </div>
      )}
    </div>
  );

};

export default NewsPage;