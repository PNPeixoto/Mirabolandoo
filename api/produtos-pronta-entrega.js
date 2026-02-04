const { createClient } = require('@supabase/supabase-js');

// Inicializa Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // 1. Configura CORS (Permite que seu site acesse a API)
  res.setHeader('Access-Control-Allow-Credentials', true);
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

  try {
    // 3. Busca dados no Supabase
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('menu_type', 'pronta_entrega')
      .eq('active', true)
      .gte('quantity', 0)
      .order('name');

    if (error) throw error;

    // 4. Retorna sucesso
    res.status(200).json(data);
  } catch (error) {
    // 5. Retorna erro
    res.status(500).json({ error: error.message });
  }
};
