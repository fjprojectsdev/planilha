// Supabase configuration and utility functions
const SUPABASE_URL = 'https://bcydpitsybetxkukusjl.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeWRwaXRzeWJ0ZXhrdWt1c2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjY3MTQsImV4cCI6MjA3Mjc0MjcxNH0.H8r80UCGf_jxwX6Km2_ywHLszuKD7lmkOh7-RZtqHGs';

// Base Supabase client for REST API calls
async function supabaseRequest(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1${endpoint}`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${error}`);
  }

  return response.json();
}

// Contacts table operations
export const supabase = {
  // Get all contacts with optional search
  async getContacts(search = '') {
    let endpoint = '/contacts?select=*&order=created_at.desc';
    
    if (search) {
      const searchParam = encodeURIComponent(`%${search}%`);
      endpoint += `&or=(name.ilike.${searchParam},contact.ilike.${searchParam},services.ilike.${searchParam})`;
    }
    
    return await supabaseRequest(endpoint);
  },

  // Get single contact by ID
  async getContact(id) {
    const result = await supabaseRequest(`/contacts?id=eq.${id}`);
    return result[0] || null;
  },

  // Create new contact
  async createContact(data) {
    const result = await supabaseRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return result[0];
  },

  // Update contact
  async updateContact(id, data) {
    const result = await supabaseRequest(`/contacts?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    return result[0];
  },

  // Delete contact
  async deleteContact(id) {
    await supabaseRequest(`/contacts?id=eq.${id}`, {
      method: 'DELETE'
    });
    return true;
  }
};

export default supabase;