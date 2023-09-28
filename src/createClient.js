import { createClient } from "@supabase/supabase-js";

// .env ファイルから環境変数を読み込む
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseApiKey = process.env.REACT_APP_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseApiKey);


