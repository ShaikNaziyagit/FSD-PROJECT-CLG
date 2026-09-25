import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  MessageSquare,
  Heart,
  Send,
  Trash2,
  User,
  Plus,
  Tag,
  Clock,
} from 'lucide-react';

const categories = ['All', 'General', 'Academics', 'Opportunities', 'Clubs', 'Events', 'Help'];

const CommunityPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Post creation box
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newTags, setNewTags] = useState('');
  const [posting, setPosting] = useState(false);

  // Active open comment input state per post
  const [commentInputs, setCommentInputs] = useState({});

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const catParam = selectedCategory !== 'All' ? `category=${encodeURIComponent(selectedCategory)}` : '';
      const searchParam = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
      const query = [catParam, searchParam].filter(Boolean).join('&');

      const res = await api.get(`/posts${query ? `?${query}` : ''}`);
      if (res.success) {
        setPosts(res.data);
      }
    } catch (err) {
      console.error('Failed to load community feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchQuery]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      setPosting(true);
      const res = await api.post('/posts', {
        title: newTitle,
        content: newContent,
        category: newCategory,
        tags: newTags ? newTags.split(',').map((t) => t.trim()) : [],
      });

      if (res.success) {
        setNewTitle('');
        setNewContent('');
        setNewTags('');
        fetchPosts();
      }
    } catch (err) {
      alert(err.message || 'Error posting to community');
    } finally {
      setPosting(false);
    }
  };

  const handleToggleLike = async (postId) => {
    if (!isAuthenticated) {
      alert('Please log in to like posts.');
      return;
    }
    try {
      const res = await api.post(`/posts/${postId}/like`);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) => {
            if (p._id === postId) {
              const hasLiked = p.likes?.includes(user._id);
              const updatedLikes = hasLiked
                ? p.likes.filter((id) => id !== user._id)
                : [...(p.likes || []), user._id];
              return { ...p, likes: updatedLikes };
            }
            return p;
          })
        );
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleAddComment = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    try {
      const res = await api.post(`/posts/${postId}/comment`, {
        content: commentText.trim(),
      });

      if (res.success) {
        setCommentInputs({ ...commentInputs, [postId]: '' });
        fetchPosts();
      }
    } catch (err) {
      alert(err.message || 'Error adding comment');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await api.delete(`/posts/${postId}`);
      if (res.success) {
        fetchPosts();
      }
    } catch (err) {
      alert(err.message || 'Error deleting post');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        badge={<Badge variant="orange">Campus Network</Badge>}
        title="Student Community Feed"
        subtitle="Connect with fellow engineers, form hackathon squads, share project breakthroughs, and ask academic questions."
      />

      {/* Post Composer Card */}
      {isAuthenticated && (
        <GlassCard className="p-5 border-orange-500/20 shadow-glass-glow">
          <form onSubmit={handleCreatePost} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                Initiate Campus Discussion
              </span>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-stone-900 border border-white/10 text-xs text-stone-200"
              >
                <option value="General">General</option>
                <option value="Academics">Academics</option>
                <option value="Opportunities">Opportunities</option>
                <option value="Clubs">Clubs</option>
                <option value="Events">Events</option>
                <option value="Help">Help / Inquiry</option>
              </select>
            </div>

            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Discussion topic or query headline..."
              className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
            />

            <textarea
              required
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="What are you working on? (Raft consensus, hackathon team formation, etc.)..."
              className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Tags (comma-separated: Go, React, Hackathon)"
                className="w-full sm:w-80 px-3 py-1.5 rounded-lg bg-stone-900/80 border border-white/10 text-xs text-stone-200 placeholder:text-stone-500"
              />

              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                disabled={posting}
                icon={Send}
                iconPosition="right"
              >
                {posting ? 'Broadcasting...' : 'Publish Post'}
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'text-stone-300 hover:text-white bg-stone-900/50 hover:bg-stone-800/80 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search discussions..."
          className="w-full sm:w-64"
        />
      </div>

      {/* Feed Stream */}
      {loading ? (
        <LoadingSpinner size="lg" label="Connecting to Campus Discussion Stream..." />
      ) : posts.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No Discussions Yet"
          description="Be the first to ignite a campus discussion in this category!"
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const hasLiked = post.likes?.includes(user?._id);

            return (
              <GlassCard key={post._id} className="p-6 space-y-4">
                {/* Author Info & Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow-sm">
                      {post.authorName?.[0] || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{post.authorName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/20 uppercase">
                          {post.authorRole} • {post.authorDepartment}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="orange" size="xs">
                      {post.category}
                    </Badge>
                    {(post.author === user?._id || user?.role === 'super_admin') && (
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="p-1 rounded text-stone-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Controls: Like & Comment count */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggleLike(post._id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        hasLiked ? 'text-rose-400' : 'hover:text-rose-300'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${hasLiked ? 'fill-rose-400' : ''}`}
                      />
                      <span>{post.likes?.length || 0}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-orange-400" />
                      <span>{post.comments?.length || 0} Replies</span>
                    </div>
                  </div>
                </div>

                {/* Comments Thread */}
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5 bg-stone-900/60 p-3 rounded-xl border border-white/5">
                    {post.comments.map((cm, cIdx) => (
                      <div key={cIdx} className="text-xs space-y-0.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-stone-100">
                            {cm.authorName}{' '}
                            <span className="text-[10px] font-mono text-orange-300">
                              ({cm.authorRole})
                            </span>
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {new Date(cm.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-stone-300 text-xs pl-1">{cm.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Box */}
                {isAuthenticated && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={commentInputs[post._id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post._id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post._id);
                      }}
                      placeholder="Write a peer response (Enter to send)..."
                      className="flex-1 px-3 py-1.5 rounded-xl bg-stone-900/80 border border-white/10 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-orange-400"
                    />
                    <GlassButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAddComment(post._id)}
                    >
                      Reply
                    </GlassButton>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
