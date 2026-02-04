import { createClient } from '@supabase/supabase-js';

// Inicializa o Supabase com as chaves que estarão nas Variáveis de Ambiente da Vercel
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(request, response) {
  // Configurações de segurança (CORS) para permitir que seu site acesse a API
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responde rápido para verificações do navegador
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  try {
    // Busca os dados no banco
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('menu_type', 'pronta_entrega')
      .eq('active', true)
      .gte('quantity', 0)
      .order('name');

    if (error) throw error;

    // Retorna os dados
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
