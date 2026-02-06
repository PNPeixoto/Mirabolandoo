const { createClient } = require('@supabase/supabase-js');

// Inicializa Supabase com fallback para debug
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Verifica se as variáveis de ambiente estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

module.exports = async (req, res) => {
  // 1. Configura CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Responde o "Pre-flight" do navegador
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. Verifica variáveis de ambiente
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
    console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
    res.status(500).json({
      error: 'Server configuration error',
      details: 'Supabase environment variables not configured'
    });
    return;
  }

  try {
    // 4. Busca dados no Supabase
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('menu_type', 'pronta_entrega')
      .eq('active', true)
      .gte('quantity', 0)
      .order('name');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // 5. Retorna sucesso (mesmo vazio)
    res.status(200).json(data || []);
  } catch (error) {
    // 6. Retorna erro detalhado
    console.error('API Error:', error.message);
    res.status(500).json({
      error: 'Failed to load menu items',
      details: error.message
    });
  }
};
