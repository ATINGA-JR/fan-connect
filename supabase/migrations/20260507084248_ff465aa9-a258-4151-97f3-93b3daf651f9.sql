
-- Profile cover image
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cover_url text;

-- Threading on bants
ALTER TABLE public.bants ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.bants(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_bants_parent_id ON public.bants(parent_id);
CREATE INDEX IF NOT EXISTS idx_bants_user_id ON public.bants(user_id);

-- Likes
CREATE TABLE IF NOT EXISTS public.bant_likes (
  user_id uuid NOT NULL,
  bant_id uuid NOT NULL REFERENCES public.bants(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, bant_id)
);
ALTER TABLE public.bant_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes viewable by everyone" ON public.bant_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON public.bant_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.bant_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Rebants
CREATE TABLE IF NOT EXISTS public.bant_rebants (
  user_id uuid NOT NULL,
  bant_id uuid NOT NULL REFERENCES public.bants(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, bant_id)
);
ALTER TABLE public.bant_rebants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Rebants viewable by everyone" ON public.bant_rebants FOR SELECT USING (true);
CREATE POLICY "Users can rebant" ON public.bant_rebants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unrebant" ON public.bant_rebants FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Storage buckets for avatars and covers
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar images public read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users upload own avatar" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own avatar" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own avatar" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Cover images public read" ON storage.objects FOR SELECT USING (bucket_id = 'covers');
CREATE POLICY "Users upload own cover" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own cover" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own cover" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);
