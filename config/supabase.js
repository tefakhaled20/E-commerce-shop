const { createClient } = require('@supabase/supabase-js');

// Extract project ref from the S3 URL to build the standard API URL
const supabaseUrlRaw = process.env.SUPABASE_URL;
let supabaseUrl = supabaseUrlRaw;

try {
  const parsedUrl = new URL(supabaseUrlRaw);
  if (parsedUrl.hostname.includes('.storage.')) {
    const projectRef = parsedUrl.hostname.split('.')[0];
    supabaseUrl = `https://${projectRef}.supabase.co`;
  }
} catch (error) {
  // Ignore, let createClient handle invalid url
}

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
