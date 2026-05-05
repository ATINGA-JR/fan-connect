CREATE TABLE public.bants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bants are viewable by everyone"
  ON public.bants FOR SELECT USING (true);

CREATE POLICY "Users can create their own bants"
  ON public.bants FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bants"
  ON public.bants FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bants"
  ON public.bants FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_bants_updated_at
  BEFORE UPDATE ON public.bants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_bants_created_at ON public.bants (created_at DESC);
CREATE INDEX idx_bants_user_id ON public.bants (user_id);