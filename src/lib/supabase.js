import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://krwvdaokbppcbdpzkkjq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd3ZkYW9rYnBwY2JkcHpra2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NDg2MTYsImV4cCI6MjAxMDUyNDYxNn0.8EfiJ_8BmqO2oA8pSEB_2kh_iDcufv_-sojwZ2771Z8"
);

export default supabase;
