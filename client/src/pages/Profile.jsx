import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User, Mail, GraduationCap, Code2, Plus, Trash2, Save, Loader2, CheckCircle2, AlertCircle, Database } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    education: [],
    skills: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setFetching(false);
        return;
      }
      try {
        const response = await api.get(`/api/user/${user.id}`);
        const data = response.data.data;
        setFormData({
          username: data.username || '',
          email: data.email || '',
          education: data.education || [],
          skills: data.skills || []
        });
      } catch (err) {
        console.error('Failed to fetch profile', err);
        setMessage({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await api.put(`/api/user/${user.id}`, formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.msg || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
      <Loader2 size={48} className="animate-spin" style={{ color: 'var(--accent)' }} />
      <p style={{ marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Syncing_Profile...</p>
    </div>
  );

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institute: '', startDate: '', passingDate: '' }]
    });
  };

  const removeEducation = (index) => {
    const newEdu = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEdu });
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...formData.education];
    newEdu[index][field] = value;
    setFormData({ ...formData, education: newEdu });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', level: 'beginner', experience: 0 }]
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div className="page-container" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0', padding: '4rem' }}>
      <div className="dashboard-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '0.75rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Console // Profile_Matrix
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.05em' }}>USER PORTFOLIO</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Deploy your credentials to the global workforce node network.</p>
      </div>

      {message.text && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '2rem', 
          border: `1px solid var(--${message.type === 'success' ? 'accent' : 'error'})`, 
          background: 'var(--bg)',
          color: `var(--${message.type === 'success' ? 'accent' : 'error'})`, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem'
        }}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          [{message.type.toUpperCase()}] {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate}>
        <section style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            <Database size={20} color="var(--accent)" /> Identity_Data
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Full Name</label>
              <input 
                type="text" 
                value={formData.username} 
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required 
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0', fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              <GraduationCap size={20} color="var(--accent)" /> Education_History
            </h3>
            <button type="button" onClick={addEducation} className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
              <Plus size={16} /> Add_Record
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {formData.education.map((edu, index) => (
              <div key={index} style={{ padding: '2rem', background: 'var(--bg)', border: '1px solid var(--border)', position: 'relative' }}>
                <button type="button" onClick={() => removeEducation(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Degree</label>
                    <input value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} required style={{ borderRadius: '0', background: 'var(--surface)' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Institute</label>
                    <input value={edu.institute} onChange={(e) => updateEducation(index, 'institute', e.target.value)} required style={{ borderRadius: '0', background: 'var(--surface)' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Start Date</label>
                    <input type="date" value={edu.startDate?.split('T')[0]} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} required style={{ borderRadius: '0', background: 'var(--surface)' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Passing Date</label>
                    <input type="date" value={edu.passingDate?.split('T')[0]} onChange={(e) => updateEducation(index, 'passingDate', e.target.value)} required style={{ borderRadius: '0', background: 'var(--surface)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              <Code2 size={20} color="var(--accent)" /> Skill_Matrix
            </h3>
            <button type="button" onClick={addSkill} className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
              <Plus size={16} /> Add_Skill
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {formData.skills.map((skill, index) => (
              <div key={index} style={{ padding: '1.5rem', background: 'var(--bg)', border: '1px solid var(--border)', position: 'relative' }}>
                <button type="button" onClick={() => removeSkill(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Skill Name</label>
                  <input value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} required style={{ borderRadius: '0', background: 'var(--surface)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Level</label>
                    <select value={skill.level} onChange={(e) => updateSkill(index, 'level', e.target.value)} style={{ borderRadius: '0', background: 'var(--surface)' }}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Exp (Yrs)</label>
                    <input type="number" value={skill.experience} onChange={(e) => updateSkill(index, 'experience', e.target.value)} min="0" style={{ borderRadius: '0', background: 'var(--surface)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '1.2rem', fontSize: '1rem', justifyContent: 'center' }}>
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? 'DEPLOYING_CHANGES...' : 'SAVE_PROFILE_MATRIX'}
        </button>
      </form>
    </div>
  );
};

export default Profile;

