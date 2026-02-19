// import { createBrowserClient } from "@supabase/ssr";

import { Database } from "@/src/types/supabase";
// import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//   ); 
// }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);