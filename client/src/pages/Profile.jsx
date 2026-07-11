import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User, Mail, GraduationCap, Code2, Plus, Trash2, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

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
    <div className="loading" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Loader2 size={48} className="animate-spin" color="var(--primary)" />
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
    <div className="page-container glass">
      <div className="dashboard-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>My Profile</h1>
        <p style={{ color: 'var(--text-dim)' }}>Complete your profile to stand out to employers.</p>
      </div>

      {message.text && (
        <div className={`glass ${message.type}`} style={{ padding: '1rem', marginBottom: '2rem', border: `1px solid var(--${message.type === 'success' ? 'success' : 'error'})`, color: `var(--${message.type === 'success' ? 'success' : 'error'})`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate}>
        <section style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={24} color="var(--primary)" /> Personal Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Full Name</label>
              <input 
                type="text" 
                value={formData.username} 
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required 
              />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={24} color="var(--primary)" /> Education
            </h3>
            <button type="button" onClick={addEducation} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <Plus size={18} /> Add Education
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {formData.education.map((edu, index) => (
              <div key={index} className="glass" style={{ padding: '2rem', position: 'relative' }}>
                <button type="button" onClick={() => removeEducation(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                  <Trash2 size={20} />
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label>Degree</label>
                    <input value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label>Institute</label>
                    <input value={edu.institute} onChange={(e) => updateEducation(index, 'institute', e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label>Start Date</label>
                    <input type="date" value={edu.startDate?.split('T')[0]} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label>Passing Date</label>
                    <input type="date" value={edu.passingDate?.split('T')[0]} onChange={(e) => updateEducation(index, 'passingDate', e.target.value)} required />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 size={24} color="var(--primary)" /> Skills
            </h3>
            <button type="button" onClick={addSkill} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <Plus size={18} /> Add Skill
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {formData.skills.map((skill, index) => (
              <div key={index} className="glass" style={{ padding: '1.5rem', position: 'relative' }}>
                <button type="button" onClick={() => removeSkill(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                  <Trash2 size={18} />
                </button>
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                  <label>Skill Name</label>
                  <input value={skill.name} onChange={(e) => updateSkill(index, 'name', e.target.value)} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label>Level</label>
                    <select value={skill.level} onChange={(e) => updateSkill(index, 'level', e.target.value)}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Experience (Years)</label>
                    <input type="number" value={skill.experience} onChange={(e) => updateSkill(index, 'experience', e.target.value)} min="0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }}>
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
          {loading ? 'Updating Profile...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
