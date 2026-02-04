// Arquivo: /api/produtos-pronta-entrega.js
import { createClient } from '@supabase/supabase-js';

// Inicializa o Supabase com as chaves que estarão nas Variáveis de Ambiente da Vercel
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(request, response) {
  // Configura cabeçalhos para permitir que seu site acesse a API (CORS)
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responde imediatamente a requisições OPTIONS (pre-flight)
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  try {
    // Busca os dados no Supabase
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('menu_type', 'pronta_entrega')
      .eq('active', true)
      .gte('quantity', 0)
      .order('name');

    if (error) throw error;

    // Retorna os dados para o seu site
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
