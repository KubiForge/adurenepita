import React, { useState } from 'react';
import {
  FileText, Plus, Search, Edit2, Trash2, CheckCircle2,
  Clock, Globe, Filter, ExternalLink, X, Save
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'Article' | 'Page' | 'Banner' | 'FAQ' | 'Media';
  language: 'EN';
  status: 'Published' | 'Draft';
  updated: string;
}

export const AdminContentModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Articles' | 'Pages' | 'Banners' | 'FAQs' | 'Media'>('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const [items, setItems] = useState<ContentItem[]>([
    {
      id: 'c-1',
      title: 'Understanding Addiction and Its Biological Effects',
      type: 'Article',
      language: 'EN',
      status: 'Published',
      updated: 'Nov 10, 2026',
    },
    {
      id: 'c-3',
      title: 'Drug Prevention in Secondary Schools',
      type: 'Article',
      language: 'EN',
      status: 'Draft',
      updated: 'Nov 06, 2026',
    },
    {
      id: 'c-5',
      title: 'Beyond the Stigma Campus Drive Announcement',
      type: 'Banner',
      language: 'EN',
      status: 'Published',
      updated: 'Nov 04, 2026',
    },
    {
      id: 'c-6',
      title: 'How can I anonymously request counselling help?',
      type: 'FAQ',
      language: 'EN',
      status: 'Published',
      updated: 'Nov 01, 2026',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ContentItem['type']>('Article');
  const [newLang, setNewLang] = useState<ContentItem['language']>('EN');
  const [newStatus, setNewStatus] = useState<ContentItem['status']>('Published');

  const filteredItems = items.filter((item) => {
    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Articles' && item.type === 'Article') ||
      (activeTab === 'Pages' && item.type === 'Page') ||
      (activeTab === 'Banners' && item.type === 'Banner') ||
      (activeTab === 'FAQs' && item.type === 'FAQ') ||
      (activeTab === 'Media' && item.type === 'Media');

    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? { ...i, title: newTitle, type: newType, language: newLang, status: newStatus, updated: 'Just now' }
            : i
        )
      );
    } else {
      const newItem: ContentItem = {
        id: `c-${Date.now()}`,
        title: newTitle.trim(),
        type: newType,
        language: newLang,
        status: newStatus,
        updated: 'Today',
      };
      setItems([newItem, ...items]);
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setNewTitle('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content item?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setNewTitle(item.title);
    setNewType(item.type);
    setNewLang(item.language);
    setNewStatus(item.status);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Content Management
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Create, edit, review and publish educational articles, pages, banners, FAQs and awareness media.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setNewTitle('');
            setIsModalOpen(true);
          }}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-midnight" />
          <span className="text-midnight">+ New Content</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-charcoal-light pb-2">
        {(['All', 'Articles', 'Pages', 'Banners', 'FAQs', 'Media'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-gold text-midnight font-bold shadow-sm'
                : 'text-ivory/60 hover:text-ivory bg-midnight/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-ivory/40 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Filter content by title or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
        />
      </div>

      {/* Table */}
      <div className="charcoal-card border-charcoal-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-light bg-midnight/70 text-ivory/60">
                <th className="p-3.5 font-bold uppercase tracking-wider">Title</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Type</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Language</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Updated</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-light">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-midnight/40 transition-colors">
                  <td className="p-3.5 font-semibold text-ivory max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-charcoal text-ivory/80 border border-charcoal-light">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-gold font-bold">
                    {item.language}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        item.status === 'Published'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-ivory/50">{item.updated}</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded hover:bg-midnight text-ivory/60 hover:text-gold transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded hover:bg-midnight text-ivory/60 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="charcoal-card border-gold/40 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
              <h3 className="font-heading font-bold text-lg text-ivory">
                {editingItem ? 'Edit Content Item' : 'Create New Content'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ivory/40 hover:text-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter content headline..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="Article">Article</option>
                    <option value="Page">Page</option>
                    <option value="Banner">Banner</option>
                    <option value="FAQ">FAQ</option>
                    <option value="Media">Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Language</label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="EN">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-charcoal-light">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-ivory/60 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-4 py-2 rounded-xl font-bold shadow-gold-subtle flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-midnight" />
                  <span className="text-midnight">Save Content</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
