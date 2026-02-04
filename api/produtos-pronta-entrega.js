// Arquivo: api/produtos-pronta-entrega.js
// Usando sintaxe CommonJS para garantir compatibilidade total na Vercel

const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // Configuração de CORS (Permite que seu site acesse a API)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responde imediatamente a requisições de verificação (pre-flight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('menu_type', 'pronta_entrega')
      .eq('active', true)
      .gte('quantity', 0)
      .order('name');

    if (error) throw error;

    // Retorna os dados com sucesso (Status 200)
    res.status(200).json(data);
  } catch (error) {
    // Retorna erro (Status 500)
    res.status(500).json({ error: error.message });
  }
};
