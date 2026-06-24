'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';

interface AboutContent {
  id: number;
  sectionName: string;
  content?: string;
  image?: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
}

interface Timeline {
  id: number;
  year: string;
  title: string;
  description: string;
}

const SECTIONS = [
  { key: 'Author Information', label: 'Author Information' },
  { key: 'Biography', label: 'Biography' },
  { key: 'Early Life', label: 'Early Life' },
  { key: 'Career', label: 'Career' },
  { key: 'Awards', label: 'Awards' },
  { key: 'Legacy', label: 'Legacy' },
];

export default function AboutAdminPage() {
  const [contents, setContents] = useState<Record<string, AboutContent>>({});
  const [education, setEducation] = useState<Education[]>([]);
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [activeTab, setActiveTab] = useState('content');
  const [saving, setSaving] = useState<string | null>(null);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Education form
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', year: '' });
  const [editEdu, setEditEdu] = useState<Education | null>(null);

  // Timeline form
  const [tlForm, setTlForm] = useState({ year: '', title: '', description: '' });
  const [editTl, setEditTl] = useState<Timeline | null>(null);

  const fetchData = async () => {
    try {
      const [aboutData, eduData, tlData] = await Promise.all([
        apiRequest('/api/about/content'),
        apiRequest('/api/about/education'),
        apiRequest('/api/about/timeline'),
      ]);
      const map: Record<string, AboutContent> = {};
      aboutData.forEach((a: AboutContent) => { map[a.sectionName] = a; });
      setContents(map);
      setEducation(eduData);
      setTimeline(tlData);
    } catch {}
  };

  useEffect(() => { fetchData(); }, []);

  const saveSection = async (sectionName: string, content: string) => {
    setSaving(sectionName);
    try {
      await apiRequest(`/api/about/content/${encodeURIComponent(sectionName)}`, {
        method: 'PUT',
        body: JSON.stringify({ content }),
      });
      setEditSection(null);
      fetchData();
    } finally {
      setSaving(null);
    }
  };

  // Education CRUD
  const saveEducation = async () => {
    if (editEdu) {
      await apiRequest(`/api/about/education/${editEdu.id}`, { method: 'PUT', body: JSON.stringify(editEdu) });
      setEditEdu(null);
    } else {
      await apiRequest('/api/about/education', { method: 'POST', body: JSON.stringify(eduForm) });
      setEduForm({ institution: '', degree: '', year: '' });
    }
    fetchData();
  };

  const deleteEdu = async (id: number) => {
    if (!confirm('Delete?')) return;
    await apiRequest(`/api/about/education/${id}`, { method: 'DELETE' });
    fetchData();
  };

  // Timeline CRUD
  const saveTimeline = async () => {
    if (editTl) {
      await apiRequest(`/api/about/timeline/${editTl.id}`, { method: 'PUT', body: JSON.stringify(editTl) });
      setEditTl(null);
    } else {
      await apiRequest('/api/about/timeline', { method: 'POST', body: JSON.stringify(tlForm) });
      setTlForm({ year: '', title: '', description: '' });
    }
    fetchData();
  };

  const deleteTl = async (id: number) => {
    if (!confirm('Delete?')) return;
    await apiRequest(`/api/about/timeline/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">About Page Management</h1>
        <p className="text-slate-400 mt-1">Edit the content displayed on the About page</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: 'content', label: 'Content Sections' },
          { id: 'education', label: 'Education' },
          { id: 'timeline', label: 'Career Timeline' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${activeTab === tab.id ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections Tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          {SECTIONS.map((sec) => (
            <div key={sec.key} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{sec.label}</h3>
                <button
                  onClick={() => {
                    setEditSection(sec.key);
                    setEditContent(contents[sec.key]?.content || '');
                  }}
                  className="px-3 py-1 rounded-lg text-xs border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  Edit
                </button>
              </div>
              {editSection === sec.key ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-purple-500/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder={`Enter ${sec.label} content...`}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setEditSection(null)} className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition">Cancel</button>
                    <button
                      onClick={() => saveSection(sec.key, editContent)}
                      disabled={saving === sec.key}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                    >
                      {saving === sec.key ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {contents[sec.key]?.content || <span className="italic text-slate-600">No content yet. Click Edit to add.</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          {/* Add / Edit Form */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">{editEdu ? 'Edit Education Record' : 'Add Education Record'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Institution</label>
                <input type="text" value={editEdu ? editEdu.institution : eduForm.institution}
                  onChange={(e) => editEdu ? setEditEdu({...editEdu, institution: e.target.value}) : setEduForm({...eduForm, institution: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="University name"/>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Degree</label>
                <input type="text" value={editEdu ? editEdu.degree : eduForm.degree}
                  onChange={(e) => editEdu ? setEditEdu({...editEdu, degree: e.target.value}) : setEduForm({...eduForm, degree: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. B.A. Literature"/>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Year</label>
                <input type="text" value={editEdu ? editEdu.year : eduForm.year}
                  onChange={(e) => editEdu ? setEditEdu({...editEdu, year: e.target.value}) : setEduForm({...eduForm, year: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. 1980"/>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {editEdu && <button onClick={() => setEditEdu(null)} className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition">Cancel</button>}
              <button onClick={saveEducation} className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition">
                {editEdu ? 'Update' : 'Add Record'}
              </button>
            </div>
          </div>

          {/* Education Table */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
            {education.length === 0 ? (
              <div className="text-center py-10 text-slate-500">No education records yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-400 font-medium">Institution</th>
                    <th className="px-4 py-3 text-left text-slate-400 font-medium">Degree</th>
                    <th className="px-4 py-3 text-left text-slate-400 font-medium">Year</th>
                    <th className="px-4 py-3 text-left text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {education.map((edu) => (
                    <tr key={edu.id} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{edu.institution}</td>
                      <td className="px-4 py-3 text-slate-300">{edu.degree}</td>
                      <td className="px-4 py-3 text-slate-300">{edu.year}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => setEditEdu(edu)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button onClick={() => deleteEdu(edu.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Career Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {/* Add / Edit Form */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-medium mb-4">{editTl ? 'Edit Timeline Item' : 'Add Timeline Item'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 text-xs mb-1">Year</label>
                <input type="text" value={editTl ? editTl.year : tlForm.year}
                  onChange={(e) => editTl ? setEditTl({...editTl, year: e.target.value}) : setTlForm({...tlForm, year: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g. 1985"/>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1">Title</label>
                <input type="text" value={editTl ? editTl.title : tlForm.title}
                  onChange={(e) => editTl ? setEditTl({...editTl, title: e.target.value}) : setTlForm({...tlForm, title: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Milestone title"/>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-400 text-xs mb-1">Description</label>
                <textarea value={editTl ? editTl.description : tlForm.description}
                  onChange={(e) => editTl ? setEditTl({...editTl, description: e.target.value}) : setTlForm({...tlForm, description: e.target.value})} rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" placeholder="What happened?"/>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {editTl && <button onClick={() => setEditTl(null)} className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition">Cancel</button>}
              <button onClick={saveTimeline} className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 transition">
                {editTl ? 'Update' : 'Add Item'}
              </button>
            </div>
          </div>

          {/* Timeline List */}
          <div className="space-y-3">
            {timeline.length === 0 ? (
              <div className="text-center py-10 text-slate-500 bg-white/5 rounded-2xl border border-white/10">No timeline items yet.</div>
            ) : (
              timeline.map((tl) => (
                <div key={tl.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 text-xs font-bold">{tl.year}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{tl.title}</p>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{tl.description}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => setEditTl(tl)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onClick={() => deleteTl(tl.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
