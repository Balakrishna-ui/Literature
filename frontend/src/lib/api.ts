// Centralized API utility for admin dashboard
const API_BASE = '';

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
};

export const setToken = (token: string) => {
  localStorage.setItem('admin_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('admin_token');
};

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const rawText = await res.text();
    let errMessage = 'API Error';
    try {
      const err = JSON.parse(rawText);
      errMessage = err.message || err.error || JSON.stringify(err);
    } catch {
      // It's likely an HTML error page from Vercel or Next.js
      console.error(`[API] Unhandled server error response (${res.status}):`, rawText);
      
      if (rawText.toLowerCase().includes('firebase')) {
        errMessage = 'Server configuration error: Firebase initialization failed.';
      } else if (rawText.includes('500') || res.status === 500) {
        errMessage = 'Internal Server Error (500). The server encountered a critical failure.';
      } else {
        errMessage = `Server Error (${res.status}): Unexpected response format.`;
      }
    }
    throw new Error(errMessage);
  }
  return res.json();
};

export const apiUpload = async (endpoint: string, formData: FormData) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Upload Error');
  }
  return res.json();
};
